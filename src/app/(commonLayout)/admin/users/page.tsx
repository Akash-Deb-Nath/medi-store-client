import UsersTable from "@/components/modules/userPage/usersPage";
import { userService } from "@/services/user.service";

const UsersPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) => {
  const params = await searchParams;
  const currentPage = Number(params.page) || 1;

  const { data, pagination, error } = await userService.getAllUsers(currentPage, 10);

  if (error) {
    return <div className="p-10 text-red-500">Error: {error.message}</div>;
  }

  return (
    <div className="px-6 md:px-10 py-6 space-y-6">
      <h1 className="text-2xl font-bold">Manage Users</h1>
      
      <UsersTable 
        data={data} 
        currentPage={pagination.page} 
        totalPages={pagination.totalPages}
        totalUsers={pagination.total}
      />
    </div>
  );
};

export default UsersPage;