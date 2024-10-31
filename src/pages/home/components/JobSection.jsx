import JobCard from "@/components/shared/JobCard";
import { useEffect, useState } from "react";
import { getAllJobs } from "@/lib/services/api/Jobs";


function JobSection({ jobpage, result }) {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [isJobsLoading, setIsJobsLoading] = useState(false);
  const [isJobsError, setIsJobsError] = useState(false);

  useEffect(() => {
    setIsJobsLoading(true);
    getAllJobs()
      .then((data) => {
        setJobs(data);
        setFilteredJobs(data)
      })
      .catch((err) => {
        setIsJobsError(true);
        console.log(err);
      })
      .finally(() => {
        setIsJobsLoading(false);
      });
  }, []);

  useEffect(() => {
    // console.log(result);
    if (result) {
      const filteredResults = jobs.filter((job) =>
        job.title.toLowerCase().includes(result.toLowerCase())
      );
      setFilteredJobs(filteredResults);
    } else {
      setFilteredJobs(jobs); // Reset to all jobs if search term is empty
    }
  }, [result, jobs]);


  if (isJobsLoading) {
    return (
      <section className="py-8">
        <h2 className="text-center mb-20">{jobpage ? "Available Jobs" : "Featured Jobs"}</h2>
        <div className="flex items-center justify-center h-40">
          <div className="flex items-center justify-center space-x-2">
            <div className="w-4 h-4 bg-primary rounded-full animate-bounce"></div>
            <div className="w-4 h-4 bg-primary rounded-full animate-bounce delay-200"></div>
            <div className="w-4 h-4 bg-primary rounded-full animate-bounce delay-400"></div>
          </div>
        </div>
      </section>
    );
  }

  if (isJobsError) {
    return (
      <section className="py-8">
        <h2 className="text-center mb-20">{jobpage ? "Available Jobs" : "Featured Jobs"}</h2>
        <div className="mt-4 flex flex-col gap-y-8">
          <p>Error while fething data...</p>
        </div>
      </section>
    );
  }
  
  return (
    <section className="py-8 mb-20 px-8">
      <h2 className="text-center mb-20">{jobpage ? "Available Jobs" : "Featured Jobs"}</h2>
      <div className={`mt-4 flex items-center justify-start overflow-x-auto scrollbar-none ${jobpage ? "flex-wrap" : "flex-nowrap "}`}>
        {filteredJobs.map((job) => {
          return (
            <JobCard
              key={job._id}
              title={job.title}
              _id={job._id}
              type={job.type}
              location={job.location}
              company={job.company?.name}
            />
          );
        })}
      </div>
    </section>
  );
}

export default JobSection;
