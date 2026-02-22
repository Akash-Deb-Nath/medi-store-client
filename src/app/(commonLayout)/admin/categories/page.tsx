import { getCategories } from '@/actions/categories.action';
import CategoriesCard from '@/components/modules/categoriesPage/categoriesCard';
import { Button } from '@/components/ui/button';
import { Categories } from '@/types';
import Link from 'next/link';

const CategoriesPage = async() => {
    const data=await getCategories();
    return (
        <div className='flex flex-col justify-center items-center gap-5 p-5'>
            <Link href="/admin/categories/addCategories">
                <Button className='mb-5'>Add New Medicine</Button>
            </Link>
            <div className='flex flex-wrap justify-center p-3'>
            {
                data?.map((category:Categories)=><CategoriesCard key={category.id} category={category}></CategoriesCard>)
            }
        </div>
        </div>
    );
};

export default CategoriesPage;