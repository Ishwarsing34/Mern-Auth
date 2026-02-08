import { useState, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { assets } from "../assets/assets";
import { toast } from "react-toastify";
import { AppContent } from "../context/AppContext";

const ResetPassword = () => {
  const navigate = useNavigate();
  const { backendUrl } = useContext(AppContent);

  const [email, setEmail] = useState("");
  const [step, setStep] = useState(1); // 1 = email, 2 = otp
  const [otp, setOtp] = useState(Array(6).fill(""));

  const inputRefs = useRef([]);

  /* ---------------- SEND OTP ---------------- */
  const sendOtpHandler = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        backendUrl + "/api/auth/send-reset-otp",
        { email },
        { withCredentials: true }
      );

      if (data.success) {
        toast.success("OTP sent to your email");
        setStep(2);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  /* ---------------- OTP INPUT HANDLERS ---------------- */
  const handleInput = (e, index) => {
    const value = e.target.value.replace(/\D/, "");
    if (!value) return;

    const updatedOtp = [...otp];
    updatedOtp[index] = value;
    setOtp(updatedOtp);

    if (index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    const pasted = e.clipboardData.getData("text").slice(0, 6);
    if (!/^\d+$/.test(pasted)) return;

    const pastedOtp = pasted.split("");
    setOtp(pastedOtp);

    pastedOtp.forEach((digit, i) => {
      inputRefs.current[i].value = digit;
    });
  };

  /* ---------------- VERIFY OTP ---------------- */
  const verifyOtpHandler = async (e) => {
    e.preventDefault();

    try {
      const otpValue = otp.join("");

      const { data } = await axios.post(
        backendUrl + "/api/auth/verify-reset-otp",
        { email, otp: otpValue },
        { withCredentials: true }
      );

      if (data.success) {
        toast.success("OTP verified");

        navigate("/new-password", {
          state: { resetToken: data.resetToken },
        });
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-200 to-purple-400">
      <img
        onClick={() => navigate("/")}
        src={assets.logo}
        alt="logo"
        className="absolute left-5 sm:left-20 top-5 w-28 sm:w-32 cursor-pointer"
      />

      {/* ================= EMAIL FORM ================= */}
      {step === 1 && (
        <form
          onSubmit={sendOtpHandler}
          className="bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm"
        >
          <h1 className="text-white text-2xl font-semibold text-center mb-4">
            Reset Password
          </h1>

          <p className="text-center mb-6 text-indigo-300">
            Enter your registered email address
          </p>

          <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
            <img src={assets.mail_icon} alt="" className="w-3 h-3" />
            <input
              type="email"
              placeholder="Email id"
              className="bg-transparent outline-none text-white w-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <button className="w-full py-2.5 bg-gradient-to-r from-indigo-500 to-indigo-900 text-white rounded-full">
            Submit
          </button>
        </form>
      )}

      {/* ================= OTP FORM ================= */}
      {step === 2 && (
        <form
          onSubmit={verifyOtpHandler}
          className="bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm"
        >
          <h1 className="text-white text-2xl font-semibold text-center mb-4">
            Email Verify OTP
          </h1>

          <p className="text-center mb-6 text-indigo-300">
            Enter the 6-digit code sent to your email
          </p>

          <div className="flex justify-between mb-8" onPaste={handlePaste}>
            {Array(6)
              .fill(0)
              .map((_, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength="1"
                  className="w-12 h-12 bg-[#333A5C] text-white text-center text-xl rounded-md"
                  ref={(el) => (inputRefs.current[index] = el)}
                  onInput={(e) => handleInput(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  required
                />
              ))}
          </div>

          <button className="w-full py-2.5 bg-gradient-to-r from-indigo-500 to-indigo-900 text-white rounded-full">
            Verify Email
          </button>
        </form>
      )}
    </div>
  );
};

export default ResetPassword;
