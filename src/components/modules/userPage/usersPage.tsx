"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, Edit } from "lucide-react";
import Image from "next/image";
import { User } from "@/types/user.type";

interface UsersTableProps {
  data: User[];
  currentPage: number;
  totalPages: number;
  totalUsers: number;
}

const UsersTable = ({ data, currentPage, totalPages, totalUsers }: UsersTableProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", newPage.toString());
    router.push(`${pathname}?${params.toString()}`);
  };

  const limit = 10;

  return (
    <div className="space-y-4">
      <div className="border rounded-lg bg-white overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px] text-center">SL</TableHead>
              <TableHead>User</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((user, index) => (
              <TableRow key={user.id}>
                <TableCell className="text-center text-muted-foreground">
                  {((currentPage - 1) * limit + index + 1).toString().padStart(2, '0')}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="relative h-9 w-9 rounded-full overflow-hidden border">
                      <Image 
                        src={user.image || "/ProfilePicture.png"} 
                        alt={user.name} 
                        fill 
                        className="object-cover" 
                      />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-medium">{user.name}</span>
                      <span className="text-xs text-muted-foreground">{user.email}</span>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="capitalize">{user?.role?.toLowerCase()}</TableCell>
                <TableCell>
                  <Badge variant="secondary" className={user.status === "ACTIVE" ? "bg-green-100 text-green-700" : ""}>
                    {user.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm"><Edit className="h-4 w-4" /></Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination Controls */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Showing total <span className="font-bold">{totalUsers}</span> users
        </p>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            disabled={currentPage <= 1}
            onClick={() => handlePageChange(currentPage - 1)}
          >
            <ChevronLeft className="h-4 w-4 mr-1" /> Previous
          </Button>
          <span className="text-sm font-medium">
            Page {currentPage} of {totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            disabled={currentPage >= totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            Next <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UsersTable;