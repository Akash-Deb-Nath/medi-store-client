"use client";

import { getMedicines } from "@/actions/medicine.action";
import MedicineCard from "@/components/modules/shopPage/medicine-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Medicine } from "@/types";
import { useState, useEffect } from "react";

export default function ShopPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchMedicines = async () => {
      setLoading(true);
      try {
        const { data } = await getMedicines({
          search: searchTerm,
        });
        setMedicines(data || []);
      } catch (err) {
        console.error("Failed to fetch medicines", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMedicines();
  }, [searchTerm]);

  return (
    <div className="p-6 flex flex-col items-center justify-center">
      <div className="flex gap-2 mb-6 w-full md:w-[400px] mx-auto">
  <Input
    type="text"
    placeholder="Search medicines..."
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
  />
  <Button
    onClick={() => setSearchTerm(searchTerm)}
    className="px-4 py-2 bg-blue-600 text-white rounded"
  >
    Search
  </Button>
      </div>

      {loading && <p className="text-sm text-slate-500">Loading...</p>}

      <div className="flex flex-wrap justify-center gap-5 p-10">
        {medicines.map((medicine) => (
          <MedicineCard key={medicine.id} medicine={medicine} />
        ))}
      </div>
    </div>
  );
}