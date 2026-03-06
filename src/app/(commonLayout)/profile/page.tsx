import { getSession } from "@/actions/user.action";
import UserCard from "@/components/modules/userPage/userCard";
import { redirect } from "next/navigation";

const ProfilePage = async() => {
    const user=await getSession();
            if (user.data===null) {
                redirect("/login");
            }
            console.log(user);
    return (
        <div className="p-10">
            <UserCard user={user.data} />
        </div>
    );
};

export default ProfilePage;