"use client";

import { useState } from "react";
import CategoriesCard from "@/components/modules/categoriesPage/categoriesCard";
import { Categories } from "@/types";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface Props {
  payload: Categories[];
}

export default function CategoriesPageClient({ payload }: Props) {
  const [items, setItems] = useState<Categories[]>(payload);

  const handleRemove = (id: string) => {
    setItems(prev => prev.filter(category => category.id !== id));
  };

  return (
    <div className="flex flex-col justify-center items-center gap-5 p-5">
      <Link href="/admin/categories/addCategories">
        <Button className="mb-5">Add New Categories</Button>
      </Link>
      <div className="flex flex-wrap justify-center p-5 gap-5">
        {items.map(category => (
          <CategoriesCard
            key={category.id}
            category={category}
            onDelete={() => handleRemove(category.id)}
          />
        ))}
      </div>
    </div>
  );
}