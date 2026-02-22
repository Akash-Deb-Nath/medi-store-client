import MedicineDetailsCardCustomer from "@/components/modules/shopPage/medicineDetailsCardSeller";
import { medicineService } from "@/services/medicine.service";

interface MedicineDetailProps {
  params: Promise<{ medicineId: string }>;
}

export default async function MedicineDetailPage({ params }: MedicineDetailProps) {
  const { medicineId } = await params;
  const { data} = await medicineService.getMedicinesById(medicineId);
  return (
    <div className="flex gap-5 justify-center"> 
        <MedicineDetailsCardCustomer key={data.id} medicine={data} />
    </div>
  );
}