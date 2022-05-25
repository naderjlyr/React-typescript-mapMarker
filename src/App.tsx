import React, { useEffect } from "react";
import { useFetchData } from "./hooks/useApi";
import { EFetchState } from "./types/api";
import { LoadingSpinner } from "@textkernel/oneui";
import "@textkernel/oneui/dist/oneui.min.css";
function App() {
  const [jobs, fetchState, getJobs] = useFetchData();

  useEffect(() => {
    getJobs();
  }, []);

  return (
    <div className="App">
      {fetchState === EFetchState.LOADING && (
        <LoadingSpinner
          centerIn={"viewport"}
          context="brand"
          hidden={false}
          size={undefined}
        >
          Loading...
        </LoadingSpinner>
      )}
      {/* {jobs.map((item) => (
        <div>
          <li>{item?.job_title}</li>
          <li>{item?.organization_name}</li>
          <li>{item?.location_coordinates}</li>
        </div>
      ))} */}
    </div>
  );
}

export default App;
