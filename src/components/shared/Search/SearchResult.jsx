
function SearchResult ({ result , setResult }) {
  return (
    <div
      className="bg-black text-white cursor-default rounded-sm py-1.5 pl-4 pr-2 text-sm outline-none hover:bg-accent hover:text-accent-foreground"
      onClick={() => setResult(result)}
    >
      {result}
    </div>
  );
};

export default SearchResult