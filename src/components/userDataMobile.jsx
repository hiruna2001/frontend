import axios from "axios";
import { useEffect, useState } from "react";

export default function UserDataMobile() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isLogoutConfirmOpen, setIsLogoutConfirmOpen] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token === null) {
            setUser(null);
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

    return (
        <div className="flex justify-center items-center">

            {isLogoutConfirmOpen && (
                <div className="fixed z-50 w-full h-screen top-0 left-0 bg-black/30 flex justify-center items-center">
                    <div className="w-[300px] h-[200px] bg-primary gap-[40px] relative flex flex-col justify-center items-center rounded-xl">
                        <h1 className="text-2xl text-secondary text-center">
                            Are you sure you want to log out?
                        </h1>

                        <div className="flex gap-4">
                            <button
                                onClick={() => setIsLogoutConfirmOpen(false)}
                                className="px-4 py-2 rounded bg-secondary text-primary"
                            >
                                Cancel
                            </button>

                            <button
                                onClick={() => {
                                    localStorage.removeItem("token");
                                    window.location.href = "/login";
                                }}
                                className="px-4 py-2 rounded bg-accent text-primary"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {loading && (
                <div className="w-[30px] h-[30px] border-[3px] border-white border-b-transparent rounded-full animate-spin"></div>
            )}

            {user && (
                <div className="h-full w-full flex justify-center items-center gap-2">
                    <img
                        src={user.image}
                        className="w-[40px] h-[40px] object-cover rounded-full border-[2px] border-primary"
                    />
                    <span>{user.firstName}</span>

                    <select
                        onChange={(e) => {
                            if (e.target.value === "logout") {
                                setIsLogoutConfirmOpen(true);
                            }
                        }}
                        className="ml-2 bg-accent max-w-[20px] text-primary p-1 rounded"
                    >
                        <option value=""></option>
                        <option value="account">Account Settings</option>
                        <option value="orders">Orders</option>
                        <option value="logout">Logout</option>
                    </select>
                </div>
            )}

            {!loading && user == null && (
                <a href="/login" className="bg-secondary text-primary p-2">
                    Login
                </a>
            )}
        </div>
    );
}
