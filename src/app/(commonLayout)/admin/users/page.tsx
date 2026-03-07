import UserCard from '@/components/modules/userPage/userCard';
import { userService } from '@/services/user.service';
import { User } from '@/types/user.type';

const UsersPage = async() => {
    const {data}=await userService.getAllUsers();
    return (
        <div className="flex justify-center">
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 py-10 px-5">
    {data?.map((user: User) => (
      <UserCard key={user.id} user={user} />
    ))}
  </div>
</div>
    );
};

export default UsersPage;