"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

type User = {
    id: number;
    name: string;
    username: string;
    email: string;
    phone: string;
    website: string;
};

export default function UsersClient() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const router = useRouter();

    useEffect(() => {
        async function fetchUsers() {
            try {
                const response = await fetch(
                    "https://jsonplaceholder.typicode.com/users"
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
        <ul className="space-y-4 p-4">
            {users.map((user) => (
                <li
                    key={user.id}
                    className="flex items-center justify-between p-4 bg-white shadow-md rounded-lg text-gray-700"
                >
                    {user.name} ({user.email}) ({user.phone}) ({user.website})
                    <button 
                        onClick={() => router.push("/")} 
                        className="bg-blue-500 text-white p-2 rounded-md">
                            Details
                    </button>
                </li>
            ))}
        </ul>
    );
}