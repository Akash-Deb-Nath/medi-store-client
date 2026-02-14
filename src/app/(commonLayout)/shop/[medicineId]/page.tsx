import MedicineDetailsCardCustomer from "@/components/modules/shopPage/medicineDetailsCardSeller";
import { medicineService } from "@/services/medicine.service";
import { Medicine } from "@/types";

interface MedicineDetailProps {
  params: Promise<{ medicineId: string }>; // notice Promise
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