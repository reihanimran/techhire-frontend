  import { Button } from "@/components/ui/button";
  import { Card, CardHeader, CardTitle } from "@/components/ui/card";
  import { Link } from "react-router-dom";



  function JobApplicationCard({ _id, jobId, fullName, companyId }) {
    return (
      <Link to={`/admin/${companyId}/job/${jobId}/application/${_id}`} className="mb-10">
        <Card>
          <CardHeader className="flex-row justify-between items-center">
            <CardTitle>{fullName}</CardTitle>
            <Button>View</Button>
          </CardHeader>
        </Card>
      </Link>
    );
  }

  export default JobApplicationCard;
