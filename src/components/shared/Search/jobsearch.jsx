import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select";
import { useEffect, useState } from "react";
import { getAllJobs } from "@/lib/services/api/Jobs";
import SearchBar from "./SearchBar";
import { SearchResultsList } from "./SearchResultsList";


function JobSearch({results, setResults, setResult}) {


    const [uniqueArray1, setUniqueArray1] = useState([]);
    const [uniqueArray2, setUniqueArray2] = useState([]);
    const [jobs, setJobs] = useState([]);
    const [isJobsLoading, setIsJobsLoading] = useState(false);
    const [isJobsError, setIsJobsError] = useState(false);
  
    useEffect(() => {
      setIsJobsLoading(true);
      getAllJobs()
        .then((data) => {
          setJobs(data);
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

      const uniqueTypes1 = [...new Set(jobs.map(job => job.type))];
      setUniqueArray1(uniqueTypes1);
      const uniqueTypes2 = [...new Set(jobs.map(job => job.location))];
      setUniqueArray2(uniqueTypes2);

}, [jobs]);



if (isJobsLoading) {
    return (
    <div className="flex justify-center items-center">   
        <Select>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Job Type" />
            </SelectTrigger>
            <SelectContent>
                <div className="flex items-center justify-center space-x-2 py-4">
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce delay-200"></div>
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce delay-400"></div>
                </div>
            </SelectContent>
        </Select>
        <Select>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Location" />
            </SelectTrigger>
            <SelectContent>
                <div className="flex items-center justify-center space-x-2 py-4">
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce delay-200"></div>
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce delay-400"></div>
                </div>
            </SelectContent>
        </Select>          
    </div>

    );
  }

  if (isJobsError) {
    return (
        <div className="flex justify-center items-center gap-x-4">
        <Select>
            <SelectTrigger className="w-[140px] md:w-[180px]">
                <SelectValue placeholder="Job Type" />
            </SelectTrigger>
            <SelectContent>
                <div className="flex items-center justify-center space-x-2 py-4">
                    <p className="text-white">Error while fething data...</p>
                </div>
            </SelectContent>
        </Select>
        <Select>
            <SelectTrigger className="w-[140px] md:w-[180px]">
                <SelectValue placeholder="Location" />
            </SelectTrigger>
            <SelectContent>
                <div className="flex items-center justify-center space-x-2 py-4">
                    <p className="text-white">Error while fething data...</p>
                </div>
            </SelectContent>
        </Select>          
    </div>
    );
  }




    return (

        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 px-8">
            <div className="w-full md:w-[40%] flex flex-col items-center min-w-[200px]">
                <SearchBar setResults={setResults} setResult={setResult}/>
                {results && results.length > 0 && <SearchResultsList setResult={setResult} results={results} />}
            </div>
            <div className="flex justify-center items-center gap-2">
                <Select>
                    <SelectTrigger className="w-[160px] md:w-[180px]">
                        <SelectValue placeholder="Job Type" />
                    </SelectTrigger>
                    <SelectContent>
                        {uniqueArray1.map((type, index) => (
                            <SelectItem key={index} value={type}>
                                {type}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <Select>
                    <SelectTrigger className="w-[160px] md:w-[180px]">
                        <SelectValue placeholder="Location" />
                    </SelectTrigger>
                    <SelectContent>
                        {uniqueArray2.map((type, index) => (
                            <SelectItem key={index} value={type}>
                                {type}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>        
            </div>
        </div>
    );
  }
  
  export default JobSearch;
  