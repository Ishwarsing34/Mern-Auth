import userModel from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import transporter from "../config/nodemailer.js";
import { PASSWORD_RESET_TEMPLATE } from "../config/emailTemplates.js";

export const register = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.json({ success: false, message: "Missing Details" });
    }

    try {
        const existingUser = await userModel.findOne({ email });

        if (existingUser) {
            return res.json({
                success: false,
                message: "User already exists",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new userModel({
            name,
            email,
            password: hashedPassword,
        });

        await user.save();

        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });


        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: email,
            subject: 'Welcome to our APP',
            text: `CONGRATS!!! your account has been created with email id : ${email}`
        }

        await transporter.sendMail(mailOptions);


        res.json({ success: true });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};


export const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.json({ success: false, message: "Missing Details" });
    }

    try {
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.json({
                success: false,
                message: "User not found",
            });
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if (!isPasswordMatch) {
            return res.json({
                success: false,
                message: "Invalid credentials",
            });
        }

        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        res.json({ success: true });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};


export const logout = async (req, res) => {
    try {
        res.clearCookie("token", "", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
            expires: new Date(0),
        });

        res.json({ success: true, message: "Logged out successfully" });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};


export const sendVerifyOtp = async (req, res) => {

    try {

        const userId = req.userId;

        const user = await userModel.findById(userId)

        if (user.isAcccountVerified) {
            return res.json({
                success: false,
                message: "Account is already verified"
            })
        }


        const otp = String(Math.floor(100000 + Math.random() * 900000))

        user.verifyOtp = otp;
        user.verifyOtpExpireAt = Date.now() + 24 * 60 * 60 * 1000;

        await user.save();


        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: user.email,
            subject: 'Account verification OTP',
            text: `Your OTP is ${otp}. verify your account using this OTP`
        }

        await transporter.sendMail(mailOptions)


        res.json({
            success: true,
            message: "verification OTP sent on Email"
        })




    } catch (error) {
        res.json({
            success: false,
            message: error.message
        })
    }
}


export const verifyEmail = async (req, res) => {

    const userId = req.userId;
    const { otp } = req.body;

    if (!userId || !otp) {
        return res.json({ success: false, message: "Missing Details" });
    }

    try {
        const user = await userModel.findById(userId);

        if (!user) {
            return res.json({ success: false, message: "User not found" });
        }

        if (user.verifyOtp === "" || user.verifyOtp !== otp) {
            return res.json({ success: false, message: "Invalid OTP" });
        }

        if (user.verifyOtpExpireAt < Date.now()) {
            return res.json({ success: false, message: "OTP Expired" });
        }

        user.isAccountVerified = true;
        user.verifyOtp = "";
        user.verifyOtpExpireAt = 0;

        await user.save();

        return res.json({
            success: true,
            message: "Email verified successfully",
        });
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
};


export const isAuthenticated = async (req, res) => {
    try {
        return res.json({ success: true });
    } catch (error) {
        return res.json({
            success: false,
            message: error.message,
        });
    }
};


export const sendResetOtp = async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.json({
            success: false,
            message: "Email is required",
        });
    }

    try {
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.json({
                success: false,
                message: "User not found",
            });
        }

        const otp = String(Math.floor(100000 + Math.random() * 900000))

        user.resetOtp = otp;
        user.resetOtpExpireAt = Date.now() + 15 * 60 * 60 * 1000;

        await user.save();


        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: user.email,
            subject: 'Password Reset OTP',
            html: PASSWORD_RESET_TEMPLATE.replace("{{OTP}}", otp)
        }

        await transporter.sendMail(mailOptions)


        return res.json({
            success: true,
            message: "OTP sent successfully",
        });
    } catch (error) {
        return res.json({
            success: false,
            message: error.message,
        });
    }
};




export const verifyResetOtp = async (req, res) => {
    const { email, otp } = req.body;

    if (!email || !otp) {
        return res.json({
            success: false,
            message: "Email and OTP are required",
        });
    }

    try {
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.json({ success: false, message: "User not found" });
        }

        if (user.resetOtp !== otp) {
            return res.json({ success: false, message: "Invalid OTP" });
        }

        if (user.resetOtpExpireAt < Date.now()) {
            return res.json({ success: false, message: "OTP expired" });
        }

        // 🔐 generate temporary reset token
        const resetToken = crypto.randomBytes(32).toString("hex");

        user.passwordResetToken = resetToken;
        user.passwordResetExpireAt = Date.now() + 10 * 60 * 1000; // 10 mins

        // invalidate OTP
        user.resetOtp = "";
        user.resetOtpExpireAt = 0;

        await user.save();

        return res.json({
            success: true,
            resetToken,
            message: "OTP verified",
        });
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
};

export const setNewPassword = async (req, res) => {
    const { resetToken, newPassword } = req.body;

    if (!resetToken || !newPassword) {
        return res.json({
            success: false,
            message: "Reset token and new password required",
        });
    }

    try {
        const user = await userModel.findOne({
            passwordResetToken: resetToken,
            passwordResetExpireAt: { $gt: Date.now() },
        });

        if (!user) {
            return res.json({
                success: false,
                message: "Invalid or expired reset token",
            });
        }

        user.password = await bcrypt.hash(newPassword, 10);
        user.passwordResetToken = "";
        user.passwordResetExpireAt = 0;

        await user.save();

        return res.json({
            success: true,
            message: "Password reset successful",
        });
    } catch (error) {
        return res.json({
            success: false,
            message: error.message,
        });
    }
};
