"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { EditCategories } from "@/actions/categories.action";
import { Categories } from "@/types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { toast } from "sonner";

interface EditCategoriesProps {
  category: Categories;
  open: boolean;
  onClose: () => void;
  onUpdate: (newDetails: string) => void;
}

export function EditCategoriesModal({ category, open, onClose,onUpdate }: EditCategoriesProps) {
  const [details, setDetails] = useState(category.details);

  const handleSave = async () => {
    const toastId=toast.loading("Editing category");
  try {
    await EditCategories(category.id, details);
    toast.success("Category details updated successfully",{id:toastId});
    onUpdate(details);
    onClose();
  } catch (error) {
    toast.error("Failed to update category",{id:toastId});
  }
};


  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="flex flex-col gap-10">
        <DialogHeader className="flex justify-center items-center">
          <DialogTitle>Edit Category Details</DialogTitle>
        </DialogHeader>
        <Input
          value={details}
          onChange={(e) => setDetails(e.target.value)}
          placeholder="Enter new details"
        />
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}