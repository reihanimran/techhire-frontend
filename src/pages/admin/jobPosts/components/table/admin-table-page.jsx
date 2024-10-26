// AdminTablePage.js
import { useParams } from "react-router-dom";
import { columns } from "./columns";
import DataTable from "./data-table";
import Loading from "@/components/shared/Loading";

function AdminTablePage({ jobs, loading, error }) {
  const params = useParams();

  if (loading) {
    return <Loading />;
  }
  if (error) return <div>{error}</div>;

  return (
    <div className="py-6">
      <DataTable columns={columns(params)} data={jobs} />
    </div>
  );
}

export default AdminTablePage;
