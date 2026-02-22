import MedicineCard from '@/components/modules/shopPage/medicine-card';
import { Button } from '@/components/ui/button';
import { medicineService } from '@/services/medicine.service';
import { Medicine } from '@/types';
import Link from 'next/link';

const SellerMedicinePage = async() => {
    const {data}=await medicineService.getMedicinesBySeller();
    return (
        <div className='flex flex-col justify-center items-center gap-5 p-5'>
            <Link href="/seller/medicines/addMedicines">
                <Button className='mb-5'>Add New Medicine</Button>
            </Link>
            <div className="flex flex-wrap gap-5">
            {
                data?.map((medicine:Medicine) => {
                return <MedicineCard key={medicine.id} medicine={medicine} />
                })
            }
            </div>
        </div>
    );
};

export default SellerMedicinePage;