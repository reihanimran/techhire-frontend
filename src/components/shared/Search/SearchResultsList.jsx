
import SearchResult from "./SearchResult";

export const SearchResultsList = ({ results , setResult }) => {
  return (
    <div className="py-[10px] px-[20px] bg-black absolute z-10 w-[40%] flex flex-col shadow-[0px_0px_8px_#ddd] rounded-[10px] mt-14 max-h-[200px] overflow-y-auto">
      {results.map((result, id) => {
        return <SearchResult setResult={setResult} result={result.title} key={id} />;
      })}
    </div>
  );
};

export default SearchResultsList