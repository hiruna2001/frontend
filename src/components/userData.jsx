import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function UserData() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            setLoading(false);
            return;
        }

        axios
            .get(import.meta.env.VITE_API_URL + "/api/users/me", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                setUser(res.data);
                setLoading(false);
            })
            .catch(() => {
                localStorage.removeItem("token");
                setUser(null);
                setLoading(false);
            });
    }, []);

    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
        navigate("/login");
    };

    return (
        <div className="relative flex items-center">
            {/* Loading */}
            {loading && (
                <div className="w-6 h-6 border-2 border-primary border-b-transparent rounded-full animate-spin" />
            )}

            {/* Logged-in user */}
            {!loading && user && (
                <div className="relative">
                    <button
                        onClick={() => setOpen(!open)}
                        className="flex items-center gap-3 bg-secondary px-3 py-2 rounded-full hover:bg-opacity-90 transition"
                    >
                        <img
                            src={user.image || "/avatar.png"}
                            referrerPolicy="no-referrer"
                            className="w-9 h-9 rounded-full object-cover border-2 border-accent"
                        />
                        <span className="text-primary font-medium hidden sm:block">
                            {user.firstName}
                        </span>
                        <svg
                            className="w-4 h-4 text-primary"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                        >
                            <path d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>

                    {/* Dropdown */}
                    {open && (
                        <div className="absolute right-0 mt-2 w-48 bg-secondary rounded-xl shadow-lg overflow-hidden z-50">
                            <button
                                onClick={() => navigate("/settings")}
                                className="w-full text-left px-4 py-2 hover:bg-accent hover:text-primary transition"
                            >
                                Account Settings
                            </button>
                            <button
                                onClick={() => navigate("/orders")}
                                className="w-full text-left px-4 py-2 hover:bg-accent hover:text-primary transition"
                            >
                                Orders
                            </button>
                            <button
                                onClick={logout}
                                className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-100 transition"
                            >
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            )}

            {/* Not logged in */}
            {!loading && !user && (
                <button
                    onClick={() => navigate("/login")}
                    className="bg-accent text-primary px-4 py-2 rounded-full font-medium hover:opacity-90 transition"
                >
                    Login
                </button>
            )}
        </div>
    );
}
