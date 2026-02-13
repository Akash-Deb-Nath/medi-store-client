import { SellerProfileForm } from "@/components/modules/profileCompletionPage/seller-form";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const UserProfilePage = () => {
    return (
        <div className='flex flex-col justify-center items-center max-w-8/10 md:max-w-5/10 mx-auto my-10 p-10 bg-[#DBEAFE] gap-10'>
            <h1 className="text-xl md:text-2xl">Complete your profile</h1>
            <div className="flex flex-col justify-center items-center gap-3">
            <Button size="lg" className="w-30">
                <Link href="/userProfile/seller">Be a Seller</Link>
            </Button>
            <p>or</p>
            <Button size="lg" className="w-30">
                <Link href="/userProfile/customer">Be a Customer</Link>
            </Button>
            </div>
        </div>
    );
};

export default UserProfilePage;