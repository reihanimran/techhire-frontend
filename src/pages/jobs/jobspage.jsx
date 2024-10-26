import JobSection from "../home/components/JobSection";
import JobSearch from "../../components/shared/Search/jobsearch";
import { useState } from "react";
import Footer from "@/components/shared/footer";


function JobsPage() {

  const [results, setResults] = useState([]);
  const [result, setResult] = useState("");


  return (
    <>
      <section className="mt-[40%] md:mt-[10%] shadow-sm">
        <JobSearch setResults={setResults} results={results} setResult={setResult}/>
        <JobSection jobpage={true} result={result}/>
      </section>
      <Footer />
    </>

  );
}

export default JobsPage;
