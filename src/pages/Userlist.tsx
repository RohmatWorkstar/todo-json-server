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

    if (loading) return <h1>Loading...</h1>;
    if (error) return <h1>{error}</h1>;

    return (
        <div>
            <button onClick={handleCreateUser}>Add User</button>
            <table>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Username</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => (
                        <tr key={user.id}>
                            <td>{index + 1}</td>
                            <td>{user.username}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>
                                <button onClick={() => handleUpdateUser(user.id)}>Update</button>
                                <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserList;
