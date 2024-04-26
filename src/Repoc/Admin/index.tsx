import { useEffect, useState } from "react";
import { deleteUser, getAllUsers } from "./client";


interface User {
    userId: string;
    username: string;
    email: string;
    // Add more properties as needed
}


export default function Admin() {
    const [users, setUsers] = useState<User[]>([]);

    // Fetch all users when the component mounts
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await getAllUsers();
                setUsers(response.data); // Assuming response.data is the array of users
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, []);

    const handleDeleteUser = async (userId: any) => {
        try {
            await deleteUser(userId);
            // Remove the deleted user from the users array
            setUsers(users.filter(user => user.userId !== userId));
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    return (
        <div>
            <h2>User List</h2>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Username</th>
                        <th>Email</th>
                        {/* Add more columns as needed */}
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.userId}>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                            {/* Add more cells for other user attributes */}
                            <td>
                                <button onClick={() => handleDeleteUser(user.userId)}>Delete</button>
                                {/* Add edit button with a link to edit user page */}
                                {/* <Link to={`/users/${user.userId}/edit`}>Edit</Link> */}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
