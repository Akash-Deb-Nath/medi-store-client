import UserCard from "@/components/modules/userPage/userCard";
import { userService } from "@/services/user.service";

const ProfilePage = async() => {
    const {data}=await userService.getSession();
    console.log(data);
    return (
        <div className="p-10">
            <UserCard user={data.user} />
        </div>
    );
};

export default ProfilePage;