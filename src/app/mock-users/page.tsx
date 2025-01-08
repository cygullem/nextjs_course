"use client";
import { useState, useEffect } from "react";

type MockUser = {
    id: number;
    name: string;
};

export default function UsersClient() {
    const [users, setUsers] = useState<MockUser[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function fetchUsers() {
            try {
                const response = await fetch(
                    "https://677e1a9094bde1c1252a6027.mockapi.io/users"
                );
                if (!response.ok) throw new Error("Failed to fetch users");
                const data = await response.json();
                setUsers(data);
            } catch (err) {
                setError("Failed to fetch users");
                if (err instanceof Error) {
                    setError(`Failed to fetch users: ${err.message}`);
                }
            } finally {
                setLoading(false);
            }
        }

        fetchUsers();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="py-10">
            <form className="mb-4">
                <input 
                    className="border p-2 mr-2"
                    type="text" 
                    name="name" 
                    required 
                />
                <button 
                    className="bg-blue-500 text-white py-2 rounded-md"
                    type="submit"
                >
                    Add User
                </button>
            </form>

            <div className="p-4 grid grid-cols-3 gap-4 h-[100vh]">
                {users.map((user) => (
                    <li
                        key={user.id}
                        className="flex items-center justify-center p-4 bg-white shadow-md rounded-lg text-gray-700 cursor-pointer"
                    >
                        {user.name}
                    </li>
                ))}
            </div>
        </div>
    );
}