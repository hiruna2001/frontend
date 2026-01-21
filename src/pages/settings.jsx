import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import mediaUpload from "../utils/mediaUpload";

export default function UserSettingsPage() {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [image, setImage] = useState(null);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [user, setUser] = useState(null);
    const navigate = useNavigate();


    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            toast.error("Please login first");
            navigate("/login");
            return;
        }

        axios
            .get(import.meta.env.VITE_API_URL + "/api/users/me", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                setFirstName(res.data.firstName);
                setLastName(res.data.lastName);
                setUser(res.data);

            })
            .catch(() => {
                toast.error("Session expired. Please login again");
                localStorage.removeItem("token");
                navigate("/login");
            });
    }, [navigate]);

    async function updateUserData() {
        const data = {
            firstName: firstName,
            lastName: lastName,
            image:user.image

        }
        if (image != null) {
            const link = await mediaUpload(image);
            data.image = link;
        }

        await axios.put(import.meta.env.VITE_API_URL + "/api/users/me", data, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        }).then((res) => {
            toast.success("User data updated successfully");
        }).catch(() => {
            toast.error("Failed to update user data");
        })
        navigate("/");
    };


    async function updatePassword() {
        if (password !== confirmPassword) {
            toast.error('Passwords do not match');
            return
        }
        await axios.put(import.meta.env.VITE_API_URL + "/api/users/me/password", {
            password: password
        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        }).then((res) => {
            toast.success("Password updated successfully");
        }).catch(() => {
            toast.error("Failed to update password");
        })

        navigate("/");
    };

    return (
        <div className="min-h-screen w-full bg-[url('/bg.jpg')] bg-cover bg-center flex items-center justify-center px-6">
            <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8">

                {/* LEFT CARD */}
                <div className="glass-card">
                    <h2 className="title">User Settings</h2>

                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-20 h-20 rounded-full border-2 border-accent flex items-center justify-center text-sm text-secondary">
                            No Photo
                        </div>

                        <label className="upload-btn">
                            Upload Photo
                            <input
                                type="file"
                                hidden
                                onChange={(e) => setImage(e.target.files[0])}
                            />
                        </label>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="label">First name</label>
                            <input
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                className="input"
                            />
                        </div>

                        <div>
                            <label className="label">Last name</label>
                            <input
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                className="input"
                            />
                        </div>
                    </div>

                    <button onClick={updateUserData} className="btn mt-6">
                        Save Profile
                    </button>
                </div>

                {/* RIGHT CARD */}
                <div className="glass-card">
                    <h2 className="title">Change Password</h2>

                    <div className="space-y-4">
                        <input
                            type="password"
                            placeholder="New password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="input"
                        />
                        <input
                            type="password"
                            placeholder="Confirm password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="input"
                        />
                    </div>

                    <button onClick={updatePassword} className="btn mt-6">
                        Update Password
                    </button>
                </div>
            </div>
        </div>
    );
}
