import { Pen, Eye, Trash } from "lucide-react";
import {AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription,
  AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { deleteJobById } from "@/lib/services/api/Jobs";
import { format } from "date-fns";
import { toast } from "sonner"
import { Link } from "react-router-dom";


const formatDate = (dateString) => {
  return format(new Date(dateString), "MM/dd/yyyy hh:mm:ss a");
};

const handleJobDelete = (jobId) => {
  deleteJobById(jobId)
    .then(() => {
      toast("Job deleted successfully.");
    })
    .catch((err) => {
      console.error(err);
      alert("Failed to delete the job. Please try again.");
    });
};  

export const columns = (params) => [
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "description",
    header: "Description",
    size:200,
  },
  {
    accessorKey: "type",
    header: "Type",
  },
  {
    accessorKey: "location",
    header: "Location",
  },
  {
    accessorKey: "createdAt",
    header: "Created Date",
    cell: ({ row }) => {
      return formatDate(row.original.createdAt);
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => (
      <div className="flex justify-center space-x-4">
        <Link to={`/admin/${params.companyId}/job/${row.original._id}`}>
          <Eye
            className="w-8 h-8 cursor-pointer text-indigo-800 bg-indigo-500/50 p-2 rounded-[5px]"
            title="View"
          />
        </Link>
        <Link to={`/admin/${params.companyId}/job/edit/${row.original._id}`}>
          <Pen
            className="w-8 h-8 cursor-pointer text-green-800 bg-green-500/50 p-2 rounded-[5px]"
            title="Edit"
          />
        </Link>
        <AlertDialog>
          <AlertDialogTrigger>
            <Trash
              className="w-8 h-8 cursor-pointer text-destructive bg-destructive/50 p-2 rounded-[5px]"
              title="Delete"
            />
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure you want to delete this job?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete this job.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={() => handleJobDelete(row.original._id)}>
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    ),
  },
];
