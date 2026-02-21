import MedicineCard from '@/components/modules/shopPage/medicine-card';
import { Button } from '@/components/ui/button';
import { medicineService } from '@/services/medicine.service';
import { Medicine } from '@/types';

const SellerMedicinePage = async() => {
    const {data}=await medicineService.getMedicinesBySeller();
    console.log(data);
    return (
        <div>
            <Button>Add Medicine</Button>
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