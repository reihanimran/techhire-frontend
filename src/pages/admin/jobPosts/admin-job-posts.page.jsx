import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AdminTablePage from "./components/table/admin-table-page";
import { getJobsByCompanyId } from "@/lib/services/api/Jobs";
import { getJobApplicationsByCompanyId } from "@/lib/services/api/jobApplication";
import StatCard from "./components/statCard";

function AdminJobPostsPage() {

  const params = useParams();
  const [jobs, setJobs] = useState([]);
  const [jobApplications, setJobApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {

      Promise.all([
        getJobsByCompanyId(params.companyId),
        getJobApplicationsByCompanyId(params.companyId)
      ])
        .then(([jobsData, jobApplicationsData]) => {
          setJobs(jobsData);
          setJobApplications(jobApplicationsData);
        })
        .catch((err) => {
          console.log(err);
          setError("Failed to load data. Please try again.");
        })
        .finally(() => setLoading(false));

    }, [params.companyId]);
  
  return (
    <div className="bg-[#ebe9ea] px-2 md:px-8 h-screen overflow-hidden">
      <div className="flex space-x-4 py-8 justify-between overflow-x-auto scrollbar-none">
        <StatCard
          link={`/admin/${params.companyId}/jobs`}
          title="Jobs Posted"
          count={jobs?.length}
          icon="🧑‍💼"
          gradientClass="bg-gradient-to-r from-green-600 to-green-400"
        />
        <StatCard
          link={`/admin/${params.companyId}/jobapplications`}
          title="Total Applications"
          count={jobApplications?.length}
          icon="📩"
          gradientClass="bg-gradient-to-r from-purple-600 to-pink-400"
        /> 
        <StatCard
          link={`/admin/${params.companyId}/jobs`}
          title="Total Interviews"
          count={jobs?.length}
          icon="🎤"
          gradientClass="bg-gradient-to-r from-blue-600 to-blue-300"
        />
        <StatCard
          link={`/admin/${params.companyId}/jobapplications`}
          title="Total Interviews"
          count={jobApplications?.length}
          icon="📩"
          gradientClass="bg-gradient-to-r from-orange-500 to-yellow-400"
        /> 
      </div>
      <div className="bg-white rounded-md shadow-md p-4">
        <h2 className="text-primary">Jobs Posted</h2>
        <AdminTablePage jobs={jobs} error={error} loading={loading}/>
      </div>
    </div>
  );
}

export default AdminJobPostsPage;
