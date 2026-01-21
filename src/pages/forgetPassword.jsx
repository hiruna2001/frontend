import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function ForgetPasswordPage() {

    const [step, setStep] = useState("email");
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();

    async function sendOTP() {
        try {
            await axios.get(import.meta.env.VITE_API_URL + "/api/users/send-otp/" + email);
            toast.success("OTP sent successfully " + email);
            setStep("otp");


        } catch (error) {
            toast.error("Failed to send OTP");

        }
    }

    async function changePassword(req, res) {
        if (newPassword !== confirmPassword) {
            toast.error('Passwords do not match');
            return
        }
        try {
            await axios.post(import.meta.env.VITE_API_URL + "/api/users/change-password/",
                {
                    email: email,
                    otp: otp,
                    password: newPassword
                });
            toast.success("Password changed successfully");
            navigate("/login");

        } catch (error) {
            toast.error("OTP is invalid. Please try again.");
            return
        }


    }



    return (
        <div className="w-full h-screen bg-[url('/bg.jpg')] bg-cover bg-center flex justify-center items-center">
            {step === "email" && <div className="w-[400px] h-[400px] backdrop-blur-lg rounded-2xl flex flex-col justify-center items-center">
                <h1 className="text-2xl font-semibold text-white mb-6">Forget Password</h1>
                <input className="w-[300px] h-[50px] rounded-lg pl-4" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
                <button className="w-[300px] h-[50px] rounded-lg bg-white mt-4" onClick={sendOTP}>Send OTP</button>

            </div>}
            {step === "otp" && <div className="w-[400px] backdrop-blur-lg rounded-2xl flex flex-col justify-center items-center">
                <h1 className="text-2xl font-semibold text-white mb-6">Forget Password</h1>
                <input className="w-[300px] h-[50px] rounded-lg pl-4" type="text" value={otp} onChange={(e) => setOtp(e.target.value)} placeholder="Enter OTP" />
                <input type="password" className="w-[300px] h-[50px] rounded-lg pl-4" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="New Password" />
                <input type="password" className="w-[300px] h-[50px] rounded-lg pl-4" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm Password" />
                <button className="w-[300px] h-[50px] rounded-lg bg-white mt-4" onClick={changePassword}>Change Password</button>

            </div>}


        </div>
    )
}