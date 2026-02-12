import MedicineCard from "@/components/modules/shopPage/medicine-card";
import { medicineService } from "@/services/medicine.service";

const ShopPage = async() => {
    const {data}=await medicineService.getMedicine();
    console.log(data);
    return (
        <div>
            {
                
            }
        </div>
    );
};

export default ShopPage;