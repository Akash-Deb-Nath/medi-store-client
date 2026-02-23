import { CategoryForm } from '@/components/modules/categoriesPage/category-form';
import React from 'react';

const AddCategoriesPage = () => {
    return (
        <div className="w-8/10 md:w-5/10 mx-auto flex flex-col justify-center items-center">
                            <h1 className="text-3xl font-bold text-blue-700">Add New Category</h1>
                            <div className='w-9/10 rounded-2xl mx-auto my-10 p-10 bg-[#DBEAFE]'>
                                <CategoryForm></CategoryForm>
                            </div>
                        </div>
    );
};

export default AddCategoriesPage;