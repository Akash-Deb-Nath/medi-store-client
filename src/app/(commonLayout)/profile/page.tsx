import { userService } from "@/services/user.service";

const ProfilePage = async() => {
    const {data}=await userService.getSession();
    console.log(data);
    return (
        <div>
            <h1>This is profile</h1>
        </div>
    );
};

export default ProfilePage;