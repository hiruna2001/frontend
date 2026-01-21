import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { Loader } from "../../components/loader";
import { MdOutlineAdminPanelSettings, MdOutlinePerson, MdVerified } from "react-icons/md";

function UserBlockConfirm(props) {
    const email = props.user.email;
    const close = props.close;
    const refresh = props.refresh;
    function blockUser() {
        const token = localStorage.getItem('token')
        axios.put(import.meta.env.VITE_API_URL + "/api/users/block/" + email, {
            isBloked: !props.user.isBloked
        },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        ).then(
            (response) => {
                console.log(response.data);
                close();
                toast.success(
                    props.user.isBloked
                        ? "User unblocked successfully"
                        : "User blocked successfully"
                );

                refresh();

            }
        ).catch(
            (error) => {
                console.log(error);
                toast.error("Failed to block user");
            }
        )
    }

    return <div className="fixed left-0 top-0 w-full h-screen bg-[#00000050] z-[100] flex justify-center items-center">
        <div className="w-[700px] h-[200px] bg-primary gap-[40px] relative flex flex-col justify-center items-center rounded-xl">
            <button onClick={close} className="w-[40px] h-[40px] absolute right-[-42px] top-[-42px]  bg-red-600 rounded-full text-white flex justify-center items-center font-bold border border-red-600 hover:bg-white hover:text-red-600">
                X
            </button>
            <p className="text-xl font-semibold text-center">Are you sure you want to {props.user.isBloked ? "unblock" : "block"} the user with email: {email} ?</p>
            <div className="flex gap-[40px]">
                <button className="bg-blue-600 hover:bg-accent text-white px-4 py-2 rounded-lg" onClick={close}>Cancel</button>
                <button
                    className="bg-red-600 hover:bg-accent text-white px-4 py-2 rounded-lg ml-4"
                    onClick={blockUser}
                >
                    {props.user.isBloked ? "Unblock" : "Block"}
                </button>

            </div>

        </div>

    </div>

}

export default function UsersPage() {

    const [users, setUsers] = useState([]);
    const [isBlockConfirmVisible, setIsBlockConfirmVisible] = useState(false);
    const [userToBlock, setUserToBlock] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {

        if (isLoading) {
            const token = localStorage.getItem('token')
            if (token === null) {
                toast.error('Please login first');
                navigate('/login')
                return;
            }
            axios.get(import.meta.env.VITE_API_URL + "/api/users/all-users", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(
                (response) => {
                    setUsers(response.data);
                    setIsLoading(false);
                }
            );


        }

    }, [isLoading]);

    return (
        <div className="w-full h-full p-6 bg-primary">
            {
                isBlockConfirmVisible && <UserBlockConfirm refresh={() => { setIsLoading(true) }} user={userToBlock} close={() => { setIsBlockConfirmVisible(false) }} />
            }

            {/* Header */}
            <div className="flex justify-between items-center mb-4 px-2">
                <h2 className="text-lg font-semibold text-secondary">
                    Users
                </h2>

                <span className="text-sm text-accent font-medium">
                    {users.length} users
                </span>
            </div>

            <div className="overflow-x-auto bg-primary rounded-xl shadow-md">
                {isLoading ? <Loader /> :
                    <table className="w-full text-sm text-center border-collapse">

                        <thead className="bg-secondary text-white">
                            <tr className="h-12">
                                <th className="px-4">Image</th>
                                <th className="px-4">Email</th>
                                <th className="px-4">First Name</th>
                                <th className="px-4">Last Name</th>
                                <th className="px-4">User Role</th>
                                <th className="px-4">Actions</th>
                            </tr>
                        </thead>

                        <tbody className="text-secondary">
                            {users.map((user) => (
                                <tr
                                    key={user.email}
                                    className="
                                    h-14 border-b
                                    bg-white
                                    hover:bg-primary
                                    transition
                                "
                                >
                                    <td className="px-4">
                                        <img
                                            src={user.image || "/avatar.png"}
                                            referrerPolicy="no-referrer"
                                            className={
                                                "w-14 h-14 object-cover rounded-full mx-auto border-4 p-1 " +
                                                (user.isBloked ? "border-red-600" : "border-green-600")
                                            }
                                        />

                                    </td>

                                    <td className="px-4 font-medium ">
                                        <div className="flex justify-center items-center gap-3">
                                            {user.email}{user.isEmailVerified && <MdVerified className="text-blue-700" />}
                                        </div>
                                    </td>
                                    <td className="px-4">{user.firstName}</td>
                                    <td className="px-4 font-semibold">{user.lastName}</td>
                                    <td className="px-4 text-gray-500 ">
                                        <div>
                                            <p className="flex justify-center items-center ">{
                                                user.role == "admin" && <MdOutlineAdminPanelSettings className="text-xl text-green-400" />
                                            }
                                                {user.role == "user" && <MdOutlinePerson className="text-xl text-blue-400" />}
                                            </p>
                                        </div>
                                    </td>
                                    <td className="px-4">
                                        <div className="flex gap-4 justify-center items-center">
                                            {
                                                <button
                                                    onClick={() => {
                                                        setUserToBlock(user)
                                                        setIsBlockConfirmVisible(true)
                                                    }}
                                                    className="w-[100px] h-[30px] bg-accent text-white cursor-pointer hover:bg-accent/70 rounded-full">
                                                    {
                                                        user.isBloked ? "Unblock" : "Block"

                                                    }
                                                </button>
                                            }

                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {users.length === 0 &&
                                <tr className="h-14 border-b bg-white">
                                    <td className="px-4 text-center" colSpan={6}>No users</td>

                                </tr>}
                        </tbody>

                    </table>}
            </div>
        </div>
    );
}
