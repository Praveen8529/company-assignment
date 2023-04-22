import { React, useState, useEffect } from "react";
import useDebounce from "../hooks/useDebounce";

const SearchBox = ({ onSearch }) => {
  const [query, setQuery] = useState("");
  const debouncedSearchTerm = useDebounce(query, 500);

  const handelClear = () => {
    onSearch("");
    setQuery("");
  };

  useEffect(() => {
    onSearch(query);
  }, [debouncedSearchTerm]);

  const handelQueryChange = (e) => {
    setQuery(e.target.value);
  };
  return (
    <>
      <section>
        <label>Search</label>
        <input type="text" value={query} onChange={handelQueryChange} />
        {query.length > 0 && <button onClick={handelClear}>Clear</button>}
      </section>
    </>
  );
};

export default SearchBox;
