import { getSession } from "@/actions/user.action";
import UserCard from "@/components/modules/userPage/userCard";
import { redirect } from "next/navigation";

const ProfilePage = async() => {
    const {data,error}=await getSession();
            if (data===null) {
                redirect("/login");
            }
            console.log(data.user);
    return (
        <div className="flex justify-center items-center p-10">
            <UserCard user={data.user} />
        </div>
    );
};

export default ProfilePage;