import { revalidatePath  } from "next/cache";
import { auth, currentUser } from "@clerk/nextjs/server";

type MockUser = {
    id: number;
    name: string;
};

export default async function MockUsers() {

    const authObj = await auth();
    const userObj = await currentUser();

    
    console.log({
        authObj,
        userObj,
    });

    const res = await fetch("https://677e1a9094bde1c1252a6027.mockapi.io/users");
    const users = await res.json();

    async function addUser(formData: FormData) {
        "use server"

        const name = formData.get("name")
        const res = await fetch(
            "https://677e1a9094bde1c1252a6027.mockapi.io/users",
            {  
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ name }),
            }
        );
        const newUser = await res.json();
        revalidatePath("/mock-users");
        console.log(newUser);
    }

    return (
        <div className="p-4 bg-slate-700">
            <form action={addUser} className="mb-8">
                <input
                    className="border p-2 mr-2 rounded-lg"
                    type="text"
                    name="name"
                    required
                />
                <button
                    className="bg-blue-500 text-white p-2 rounded-lg"
                    type="submit"
                >
                    Add User
                </button>
            </form>

            <div className="grid grid-cols-3 gap-4 h-[100vh]">
                {users.map((user: MockUser) => (
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