import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

export default function RegisterPage() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
    const navigate = useNavigate();

    async function register() {
        if (password !== confirmPassword) {
            toast.error('Passwords do not match');
            return
        }
        try {
            const response = await axios.post(
                import.meta.env.VITE_API_URL + "/api/users",
                {
                    email, password, firstName, lastName
                }
            );
            toast.success("Registration successful");

            navigate("/login");


        } catch (error) {

            toast.error("Invalid email or password");
        }
    }

    return (
        <div className="w-full h-screen bg-[url('/bg.jpg')] bg-cover bg-center flex">

            {/* LEFT SIDE – BRAND */}
            <div className="w-1/2 h-full hidden lg:flex items-center justify-center bg-black/40 backdrop-blur-sm">
                <div className="text-center text-white space-y-6 animate-fadeIn">

                    <h1 className="text-6xl font-light tracking-[0.3em]">ROYAL</h1>
                    <h2 className="text-xl tracking-[0.4em] text-white/80">COSMETICS</h2>

                    <div className="relative h-8 overflow-hidden text-sm tracking-widest text-[var(--color-primary)]">
                        <p className="absolute w-full animate-slide1">✦ Elegance in Every Shade ✦</p>
                        <p className="absolute w-full animate-slide2">✦ Beauty That Defines You ✦</p>
                        <p className="absolute w-full animate-slide3">✦ Luxury You Can Feel ✦</p>
                    </div>

                </div>
            </div>

            {/* RIGHT SIDE – LOGIN */}
            <div className="w-full lg:w-1/2 h-full flex justify-center items-center">
                <div className="w-[420px] p-10 backdrop-blur-xl bg-white/25
                shadow-[0_20px_60px_rgba(0,0,0,0.35)]
                rounded-3xl flex flex-col gap-6">

                    <div className="flex justify-center">
                        <img src="/log.png" alt="Royal Cosmetic Logo" className="h-16 object-contain" />
                    </div>

                    <h2 className="text-center text-2xl font-semibold text-[var(--color-secondary)]">
                        Welcome New User
                    </h2>

                    <input
                        type="email"
                        placeholder="Email Address"
                        autoComplete="email"
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full h-11 px-4 rounded-xl bg-white/80
                        outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
                    />
                    <input
                        type="text"
                        placeholder="First Name"
                        autoComplete="given-name"
                        onChange={(e) => setFirstName(e.target.value)}
                        className="w-full h-11 px-4 rounded-xl bg-white/80
                        outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
                    />
                    <input
                        type="text"
                        placeholder="Last Name"
                        autoComplete="family-name"
                        onChange={(e) => setLastName(e.target.value)}
                        className="w-full h-11 px-4 rounded-xl bg-white/80
                        outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
                    />


                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full h-11 px-4 pr-12 rounded-xl bg-white/80
                            outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-xs"
                        >
                            {showPassword ? "HIDE" : "SHOW"}
                        </button>
                    </div>
                    <div className="relative">
                        <input
                            type={showPasswordConfirm ? "text" : "password"}
                            placeholder="Confirm Password"
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full h-11 px-4 pr-12 rounded-xl bg-white/80
                            outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-xs"
                        >
                            {showPasswordConfirm ? "HIDE" : "SHOW"}
                        </button>
                    </div>


                    <button
                        onClick={register}
                        className="w-full h-11 rounded-xl bg-[var(--color-accent)]
                        text-white font-medium hover:brightness-110"
                    >
                        Sign Up
                    </button>

                    <p className="text-center text-sm">
                        Already Have An Account?{" "}
                        <Link to="/login" className="text-[var(--color-accent)] font-medium">
                            Log In
                        </Link>
                    </p>

                    <p className="text-xs text-center text-gray-500">
                        © 2026 Royal Cosmetic · Luxury Beauty
                    </p>

                </div>
            </div>
        </div>
    );
}
