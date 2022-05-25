import React, { useEffect } from "react";
import { useFetchData } from "./hooks/useApi";
import { EFetchState } from "./types/api";
import { LoadingSpinner } from "@textkernel/oneui";
import "@textkernel/oneui/dist/oneui.min.css";
import "./App.scss";
function App() {
  const [jobs, fetchState, getJobs] = useFetchData();

  useEffect(() => {
    getJobs();
  }, []);
  return (
    <div className="container">
      {fetchState === EFetchState.LOADING && (
        <LoadingSpinner
          centerIn={"viewport"}
          context="primary"
          hidden={false}
          size={undefined}
        >
          Loading...
        </LoadingSpinner>
      )}
      {fetchState === EFetchState.ERROR && <div>asda</div>}
      {fetchState === EFetchState.SUCCESS &&
        jobs.map((item) => (
          <div key={item?.id}>
            <li>{item.job_title}</li>
            <li>{item.organization_name}</li>
            <li>{item.location_coordinates}</li>
          </div>
        ))}
    </div>
  );
}

export default App;
