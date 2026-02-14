import UserCard from '@/components/modules/userPage/userCard';
import { userService } from '@/services/user.service';
import { User } from '@/types/user.type';

const UsersPage = async() => {
    const {data}=await userService.getAllUsers();
    console.log(data);
    return (
        <div className='flex flex-wrap gap-3 p-3'>
            {
                data?.map((user:User)=><UserCard key={user.id} user={user}></UserCard>)
            }
        </div>
    );
};

export default UsersPage;