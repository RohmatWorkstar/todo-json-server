import { useEffect, useState } from "react";
import { user } from "../type/user";
import { fetchUsers, createUser, updateUser, deleteUser } from "../services/userService";

const UserList = () => {
    const [users, setUsers] = useState<user[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadUsers = async () => {
            try {
                const data = await fetchUsers();
                setUsers(data);
            } catch (err) {
                setError((err as Error).message);
            } finally {
                setLoading(false);
            }
        };
        loadUsers();
    }, []);

    const handleCreateUser = async () => {
        try {
            const newUser = await createUser({ name: "New Account", username: "New Account", email: "new@example.com" });
            setUsers([...users, newUser]);
        } catch (err) {
            setError((err as Error).message);
        }
    };

    const handleUpdateUser = async (id: number) => {
        try {
            const updatedUser = await updateUser(id, { name: "Updated Account", username: "Updated Account", email: "updated@example.com" });
            setUsers(users.map((user) => (user.id === id ? updatedUser : user)));
        } catch (err) {
            setError((err as Error).message);
        }
    };

    const handleDeleteUser = async (id: number) => {
        try {
            await deleteUser(id);
            setUsers(users.filter((user) => user.id !== id));
        } catch (err) {
            setError((err as Error).message);
        }
    };

    if (loading) return <h1 className="text-center text-lg font-semibold">Loading...</h1>;
    if (error) return <h1 className="text-center text-red-500">{error}</h1>;

    return (
        <div className="flex flex-col items-center justify-center min-h-screen w-full px-4">
            <button className="text-white bg-blue-500 font-bold p-2 rounded-md mb-3 cursor-pointer" onClick={handleCreateUser}>
                Add User
            </button>
            <div className="overflow-x-auto w-full max-w-4xl">
                <table className="w-full border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-blue-500 text-white">
                            <th className="border border-gray-300 px-4 py-2">No</th>
                            <th className="border border-gray-300 px-4 py-2">Username</th>
                            <th className="border border-gray-300 px-4 py-2">Name</th>
                            <th className="border border-gray-300 px-4 py-2">Email</th>
                            <th className="border border-gray-300 px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <tr key={user.id} className="bg-white text-black even:bg-gray-100">
                                <td className="border border-gray-300 px-4 py-2 text-center">{index + 1}</td>
                                <td className="border border-gray-300 px-4 py-2">{user.username}</td>
                                <td className="border border-gray-300 px-4 py-2">{user.name}</td>
                                <td className="border border-gray-300 px-4 py-2">{user.email}</td>
                                <td className="border border-gray-300 px-4 py-2">
                                    <button className="p-2 text-white bg-cyan-700 font-bold rounded-md" onClick={() => handleUpdateUser(user.id)}>
                                        Update
                                    </button>
                                    <button className="p-2 text-white bg-red-700 font-bold rounded-md ml-2" onClick={() => handleDeleteUser(user.id)}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UserList;
