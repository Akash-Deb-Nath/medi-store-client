"use client";

import { useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Categories } from "@/types";
import { toast } from "sonner";
import { env } from "@/env";
import { Pencil, Trash } from "lucide-react";
import { EditCategoriesModal } from "./editCategories";
import { DeleteCategories } from "@/actions/categories.action";
import { error } from 'console';

interface CategoriesCardProps {
  category: Categories;
  onDelete?:()=>void;
}

export default function CategoriesCard({ category,onDelete }: CategoriesCardProps) {
  const API_URL = env.NEXT_PUBLIC_API_URL;

  const [details,setDetails]=useState(category.details);
  const [open, setOpen] = useState(false);

  const handleDelete = async () => {
    const toastId=toast.loading("Deleting category");
    if (!confirm(`Are you sure you want to delete ${category.name}?`)) return;

    try {
      const result  =await DeleteCategories(category.id);

      if (result!==null){
      toast.success(`${category.name} deleted successfully`,{id:toastId});
      onDelete?.();
      }else{
         toast.error("Failed to delete category",{id:toastId});
      }
    } catch (error) {
      toast.error("Something went wrong while deleting",{id:toastId});
    }
  };

  return (
    <Card className="group w-100 flex justify-center items-center overflow-hidden rounded-2xl transition hover:-translate-y-1 hover:shadow-xl">
      <div className="flex flex-col gap-5">
        <CardContent className="space-y-2 p-4">
        <h1 className="text-lg font-bold text-blue-600">{category.name}</h1>
        <p>{details}</p>
      </CardContent>

      <CardFooter className="p-4 pt-0 flex gap-2">
        <Button
          className="flex items-center gap-2"
          onClick={() => setOpen(true)}
        >
          <Pencil className="w-4 h-4" /> Edit
        </Button>
        <Button
          variant="destructive"
          className="flex items-center gap-2"
          onClick={handleDelete}
        >
          <Trash className="w-4 h-4" /> Delete
        </Button>
      </CardFooter>

      {open && (
        <EditCategoriesModal
          category={category}
          open={open}
          onClose={() => setOpen(false)}
          onUpdate={(newDetails) => setDetails(newDetails)}
        />
      )}
      </div>
    </Card>
  );
}