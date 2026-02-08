import React, { useContext, useState, useRef, useEffect } from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { AppContent } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const Navbar = () => {
    const navigate = useNavigate();
    const { userData, backendUrl, setUserData, setIsLoggedin } = useContext(AppContent);
    const logout = async () => {
        try {

            axios.defaults.withCredentials = true

            const { data } = await axios.post(backendUrl + '/api/auth/logout')

            if (data.success) {
                setIsLoggedin(false);
                setUserData(false)
                navigate('/')
            }

        } catch (error) {
            toast.error(error.message)
        }
    }
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef(null);

    const sendVerificationOtp = async () => {


        try {


            axios.defaults.withCredentials = true;

            const { data } = await axios.post(backendUrl + '/api/auth/send-verify-otp')

            if (data.success) {
                navigate('/email-verify')
                toast.success(data.message)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }

    }

    // close on outside click
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="w-full flex justify-between items-center p-4 sm:p-6 sm:px-24 absolute top-0">
            <img src={assets.logo} alt="" className="w-28 sm:w-32" />

            {userData ? (
                <div ref={dropdownRef} className="relative">
                    {/* Avatar */}
                    <div
                        onClick={() => setOpen((prev) => !prev)}
                        className="w-9 h-9 flex justify-center items-center rounded-full bg-black text-white cursor-pointer select-none"
                    >
                        {userData.userData?.name?.[0]?.toUpperCase()}
                    </div>

                    {/* Dropdown */}
                    {open && (
                        <div className="absolute right-0 mt-2 w-44 bg-white rounded-lg shadow-lg z-20">
                            <ul className="py-2 text-sm text-gray-700">
                                {
                                    !userData.userData?.isAccountVerified && <li
                                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                        onClick={() => {
                                            setOpen(false);
                                           sendVerificationOtp();
                                        }}
                                    >
                                        Verify Email
                                    </li>
                                }
                                <li
                                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                    onClick={() => {
                                        setOpen(false);
                                        logout();
                                    }}
                                >
                                    Log Out
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
            ) : (
                <button
                    onClick={() => navigate("/login")}
                    className="flex items-center gap-2 border border-gray-500 rounded-full px-6 py-2 text-gray-800 hover:bg-gray-100 transition-all"
                >
                    Login
                    <img src={assets.arrow_icon} alt="" />
                </button>
            )}
        </div>
    );
};

export default Navbar;
