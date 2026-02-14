import MedicineCard from '@/components/modules/shopPage/medicine-card';
import { medicineService } from '@/services/medicine.service';
import { Medicine } from '@/types';

const SellerMedicinePage = async() => {
    const {data}=await medicineService.getMedicinesBySeller();
    console.log(data);
    return (
        <div>
            <h1>This is seller medicine Page</h1>
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