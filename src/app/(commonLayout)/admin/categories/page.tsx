import { getCategories } from '@/actions/categories.action';
import CategoriesPageClient from '@/components/modules/categoriesPage/categoriesPageClient';

export default async function CategoriesPage() {
  const data = await getCategories();
  return <CategoriesPageClient payload={data} />;
}