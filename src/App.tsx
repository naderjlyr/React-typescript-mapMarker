import React, { useEffect, useState } from "react";
import { useFetchData } from "./hooks/useApi";
import { EFetchState, TJobData } from "./types/interfaces";
import {
  LoadingSpinner,
  Header,
  Heading,
  IconJobfeed,
  Input,
} from "@textkernel/oneui";
import { MemoizedCard } from "./components/CardItem";
import LeafletMap from "./components/LeafletMap";
import "@textkernel/oneui/dist/oneui.min.css";
import "./App.scss";
import uniqueId from "./helpers/id-generator";

function App() {
  // const { fetchedJobs, fetchState, getJobs } = useFetchData();
  const [jobs, setJobs] = useState<TJobData[]>([]);
  const { fetchState, getJobs: fetchJobs } = useFetchData();

  useEffect(() => {
    const transformJobs = (jobsObj: TJobData[]) => {
      const dataWithID = jobsObj.map((job) =>
        Object.assign({ id: uniqueId() }, job)
      );
      setJobs(dataWithID);
      console.log(dataWithID);
    };
    fetchJobs(transformJobs);
  }, [fetchJobs]);

  const deleteJobHandler = (job: TJobData) => {
    const newJobs = jobs.filter((originalJob) => {
      return job.id !== originalJob.id;
    });
    setJobs(newJobs);
  };
  //   // if (jobs.length === filterJobs.length) {
  //   //   setFilteredJobs(newJobs);
  //   // } else {
  //   //   const newFilteredJobs = filteredJobs.filter((originalJob) => {
  //   //     return job.id !== originalJob.id;
  //   //   });
  //   //   setFilteredJobs(newFilteredJobs);
  //   // }
  // };

  return (
    <div className="app-container">
      <Header
        logo={{
          link: "/",
          src: "https://www.jobfeed.nl/images/jobfeed-logo.svg",
          title: "Jobfeed",
        }}
      ></Header>
      <Heading align="left" context="default" level="h1">
        <IconJobfeed context="info" size={48} title="Jobfeed" />
        Latest <span>Jobs</span>
      </Heading>

      <div className="main-content">
        <div className="job-listing">
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
            jobs?.map((job) => (
              <MemoizedCard
                key={job.id}
                job={job}
                onRemove={deleteJobHandler}
                onSelect={() => {
                  return;
                }}
              />
            ))}
        </div>
        <LeafletMap />
      </div>
    </div>
  );
}

export default App;
