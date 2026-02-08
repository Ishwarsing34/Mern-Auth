import jwt from "jsonwebtoken";

export const userAuth = async (req, res, next) => {
    const { token } = req.cookies || req.body;

    if (!token) {
        return res.json({
            success: false,
            message: "Not Authorized. Login Again",
        });
    }

    try {
        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);

        if (!tokenDecode?.id) {
            return res.json({
                success: false,
                message: "Not Authorized. Login Again",
            });
        }

        req.userId = tokenDecode.id;
        next();
    } catch (error) {
        return res.json({
            success: false,
            message: error.message,
        });
    }
};

