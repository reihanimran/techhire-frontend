import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { getAllJobs } from "@/lib/services/api/Jobs";


function SearchBar ({ setResults, setResult }) {
  const [input, setInput] = useState("");
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    getAllJobs()
    .then((data) => {
      setJobs(data);
    })
  },[]);
  

  const handleChange = (value) => {
    setInput(value);
    const filteredResults = jobs.filter((job) => 
      value && job && job.title && job.title.toLowerCase().includes(value.toLowerCase())
    );
    
    setResults(filteredResults);

    if (value === ""){
      setResult(value);
    }

  };

  return (
    <div className="w-full h-10 border-none rounded-lg px-4 bg-card flex items-center">
        <Search />
        <input className="bg-transparent border-none h-full text-md w-full ml-[5px] focus:outline-none"
            placeholder="Type to search job..."
            value={input}
            onChange={(e) => handleChange(e.target.value)}
        />
    </div>
  );
};

export default SearchBar