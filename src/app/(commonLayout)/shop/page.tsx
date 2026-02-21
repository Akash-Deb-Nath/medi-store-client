import MedicineCard from "@/components/modules/shopPage/medicine-card";
import { medicineService } from "@/services/medicine.service";
import { Medicine } from "@/types";

const ShopPage = async() => {
    const {data}=await medicineService.getMedicines();
    return (
        <div className="flex flex-wrap gap-5">
            {
                data?.map((medicine:Medicine) => {
                return <MedicineCard key={medicine.id} medicine={medicine} />
                })
            }
        </div>
    );
};

export default ShopPage;