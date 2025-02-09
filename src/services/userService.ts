import { user } from "../type/user";

export const fetchUsers = async (): Promise<user[]> => {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    if (!response.ok) throw new Error("Network response was not ok");
    return response.json();
};

export const createUser = async (newUser: Omit<user, "id">): Promise<user> => {
    const response = await fetch("https://jsonplaceholder.typicode.com/users", {
        method: "POST",
        body: JSON.stringify(newUser),
        headers: { "Content-type": "application/json; charset=UTF-8" },
    });
    if (!response.ok) throw new Error("Failed to create user");
    return response.json();
};

export const updateUser = async (id: number, updatedUser: Partial<user>): Promise<user> => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
        method: "PUT",
        body: JSON.stringify(updatedUser),
        headers: { "Content-type": "application/json; charset=UTF-8" },
    });
    if (!response.ok) throw new Error("Failed to update user");
    return response.json();
};

export const deleteUser = async (id: number): Promise<void> => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, { method: "DELETE" });
    if (!response.ok) throw new Error("Failed to delete user");
};
