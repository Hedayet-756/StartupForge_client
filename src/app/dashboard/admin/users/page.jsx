
import UsersTable from '@/components/UserTable';
import { getUsersList } from '@/lib/api/users';

const AdminUsersPage = async () => {
    const data = await getUsersList();
    console.log(data, "data");
    const users = data.users;

    return (
        <div className="p-6 bg-black min-h-screen text-white">
            <h1 className="text-2xl font-bold">User Management</h1>
            <p className="text-gray-400 mb-6">
                Manage users and their roles.
            </p>
            <UsersTable users={users} />
        </div>
    );
};

export default AdminUsersPage;