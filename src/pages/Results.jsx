import React from "react";
import SearchBox from "../components/Landing/Searchbox";
import ResultList from "../components/Results/ResultList";

const Results = () => {
  return (
    <div className='b-c'>
      <SearchBox isResultsPage={true} /> {/* ✅ Prop bhej rahe hain */}
      <ResultList />
    </div>
  );
};

export default Results;
