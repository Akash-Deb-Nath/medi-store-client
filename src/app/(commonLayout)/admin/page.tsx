import UserCard from '@/components/modules/userPage/userCard';
import { userService } from '@/services/user.service';

const AdminDashboardPage = async () => {
    const { data } = await userService.getSession();
    return (
        <div className="flex justify-center items-center p-10">
            <UserCard user={data.user} />
        </div>
    );
};

export default AdminDashboardPage;