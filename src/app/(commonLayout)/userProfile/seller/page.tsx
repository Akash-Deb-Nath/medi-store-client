import { SellerProfileForm } from "@/components/modules/profileCompletionPage/seller-form";

const SellerPage = () => {
    return (
        <div className="w-8/10 md:w-5/10 mx-auto flex flex-col justify-center items-center">
            <h1 className="text-3xl font-bold text-blue-700">Be a seller</h1>
            <div className='w-9/10 rounded-2xl mx-auto my-10 p-10 bg-[#DBEAFE]'>
                <SellerProfileForm></SellerProfileForm>
            </div>
        </div>
    );
};

export default SellerPage;