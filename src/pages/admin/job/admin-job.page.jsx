import { Separator } from "@/components/ui/separator";
import { getJobApplicationsForJob } from "@/lib/services/api/jobApplication";
import { getJobById } from "@/lib/services/api/Jobs";
import { Briefcase, MapPin } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import JobApplicationCard from "./components/jobApplicationCard";
import Loading from "@/components/shared/Loading";

function AdminJobPage() {
  const [job, setJob] = useState(null);
  const [isJobLoading, setIsJobLoading] = useState(true);
  const [jobApplications, setJobApplications] = useState([]);
  const [isJobApplicationsLoading, setIsJobApplicationsLoading] = useState(true);
  const params = useParams();
  
  useEffect(() => {
    if (!params.id) {
      return;
    }

    getJobById(params.id)
      .then((data) => {
        setJob(data);
        setIsJobLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsJobLoading(false);
      });

      getJobApplicationsForJob(params.id)
      .then((data) => {
        setJobApplications(data);
        setIsJobApplicationsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsJobApplicationsLoading(false);
      });
  }, [params.id, setJob, setJobApplications]);

  if (isJobLoading || isJobApplicationsLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loading />
      </div>
    );
  }

  return (
    <div className="py-16 px-8">
      <div>
        <h2>{job?.title}</h2>
        <div className="flex items-center gap-x-4 mt-4">
          <div className="flex items-center gap-x-2">
            <Briefcase />
            <span>{job?.type}</span>
          </div>
          <div className="flex items-center gap-x-2">
            <MapPin />
            <span>{job?.location}</span>
          </div>
        </div>
      </div>
      <div className="mt-4 py-4">
        <p>{job?.description}</p>
      </div>
      <Separator />
      <div className="py-8">
        <h2>Job Applications</h2>
        <div className="mt-8 flex flex-col">
          {jobApplications.map((application) => (
            <JobApplicationCard
              key={application._id}
              fullName={application.fullName}
              _id={application._id}
              jobId={params.id}
              companyId={params.companyId}
            />))}
        </div>
      </div>
    </div>
  );
}

export default AdminJobPage;
