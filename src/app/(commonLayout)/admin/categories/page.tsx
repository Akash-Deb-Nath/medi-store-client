import CategoriesCard from '@/components/modules/categoriesPage/categoriesCard';
import { categoriesService } from '@/services/categories.service';
import { Categories } from '@/types';

const CategoriesPage = async() => {
    const {data}=await categoriesService.getCatgeories();
    return (
        <div className='flex flex-wrap justify-center p-3'>
            {
                data?.map((category:Categories)=><CategoriesCard key={category.id} category={category}></CategoriesCard>)
            }
        </div>
    );
};

export default CategoriesPage;