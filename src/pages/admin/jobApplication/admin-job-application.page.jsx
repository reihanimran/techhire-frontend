import Loading from "@/components/shared/Loading";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { getJobApplicationById } from "@/lib/services/api/jobApplication";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";


function AdminJobApplicationPage() {
  const [jobApplication, setJobApplication] = useState(
    null
  );

  const [isLoading, setIsLoading] = useState(true);
  const params = useParams();

  useEffect(() => {
    if (!params.applicationId) return;
    getJobApplicationById(params.applicationId)
      .then((data) => {
        setJobApplication(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, [params.applicationId]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen flex-1">
        <Loading />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-y-4 flex-1">
      <Card className="bg-foreground">
        <CardHeader className="flex-row items-center gap-x-4">
          <CardTitle>{jobApplication?.fullName}</CardTitle>
          <Badge
            className={cn({
              "bg-red-500":
                jobApplication?.rating?.toLocaleLowerCase() === "bad",
              "bg-orange-400":
                jobApplication?.rating?.toLocaleLowerCase() === "moderate",
              "bg-teal-500":
                jobApplication?.rating?.toLocaleLowerCase() === "good",
            })}
          >
            {jobApplication?.rating}
          </Badge>
        </CardHeader>
      </Card>

      <Card className="p-4">
        {jobApplication.answers.map((answer, i) => {
          return <p key={i}>{answer}</p>;
        })}
      </Card>
      <div>
        <Button variant="link" asChild>
          <Link to={`/admin/${params.companyId}/job/${params.id}`}>Back</Link>
        </Button>
      </div>
    </div>
  );
}

export default AdminJobApplicationPage;
