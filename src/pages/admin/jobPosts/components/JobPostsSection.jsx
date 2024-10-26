import JobCard from "@/components/shared/JobCard";
import Loading from "@/components/shared/Loading";
import { getJobsByCompanyId } from "@/lib/services/api/Jobs";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function JobPostsSection() {
  const params = useParams();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    getJobsByCompanyId(params.companyId)
      .then((data) => {
        setJobs(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err)
        setError(true);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return(
      <div className="flex justify-center items-center flex-1">
        <Loading />
      </div>
    );
  }

  if(error) {
    <div className="flex justify-center items-center flex-1">
      <p>Error While Fetching the Data</p>
    </div>
  }


  return (
    <div className="py-12 flex flex-col justify-start items-center">
      <h2>Current Job Postings</h2>
      <div className="flex flex-wrap w-full">
        {jobs.map((job) => {
          return (
            <JobCard
              key={job._id}
              title={job.title}
              _id={job._id}
              type={job.type}
              location={job.location}
              company={job.company.name}
              isAdmin ={true}
              companyId={job.company}
            />
          );
        })}
      </div>
    </div>
  );
}

export default JobPostsSection;
