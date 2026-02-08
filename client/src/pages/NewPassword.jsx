import { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { AppContent } from "../context/AppContext";

const NewPassword = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { backendUrl } =  useContext(AppContent)

  const resetToken = state?.resetToken;

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  if (!resetToken) {
    navigate("/reset-password");
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      return toast.error("Passwords do not match");
    }

    try {
      const { data } = await axios.post(
        backendUrl + "/api/auth/set-new-password",
        { resetToken, newPassword },
        { withCredentials: true }
      );

      if (data.success) {
        toast.success("Password reset successful");
        navigate("/login");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-200 to-purple-400">
      <form
        onSubmit={handleSubmit}
        className="bg-slate-900 p-8 rounded-lg shadow-lg w-96"
      >
        <h1 className="text-white text-2xl font-semibold text-center mb-6">
          Set New Password
        </h1>

        <input
          type="password"
          placeholder="New Password"
          className="w-full mb-4 px-4 py-2 rounded bg-[#333A5C] text-white outline-none"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Confirm Password"
          className="w-full mb-6 px-4 py-2 rounded bg-[#333A5C] text-white outline-none"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />

        <button className="w-full py-2 bg-gradient-to-r from-indigo-500 to-indigo-900 text-white rounded">
          Reset Password
        </button>
      </form>
    </div>
  );
};

export default NewPassword;
