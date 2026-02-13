import MedicineCard from "@/components/modules/shopPage/medicine-card";
import { medicineService } from "@/services/medicine.service";
import { Medicine } from "@/types";

const ShopPage = async() => {
    const {data}=await medicineService.getMedicines();
    console.log(data);
    return (
        <div>
            <h1>This is shop</h1>
            {
                data?.map((medicine:Medicine) => {
                return <MedicineCard key={medicine.id} medicine={medicine} />
                })
            }
        </div>
    );
};

export default ShopPage;