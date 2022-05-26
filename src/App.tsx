import React, { useEffect, useState } from "react";
import { useFetchData } from "./hooks/useApi";
import { EFetchState, TJobData, TJobPosition } from "./types/data-models";
import {
  LoadingSpinner,
  Header,
  Heading,
  IconJobfeed,
  Input,
  ContentPlaceholder,
} from "@textkernel/oneui";
import { MemoizedCard } from "./components/CardItem";
import MemoizedMap from "./components/LeafletMap";
import "@textkernel/oneui/dist/oneui.min.css";
import "./App.scss";
import uniqueId from "./helpers/id-generator";

function App() {
  // const { fetchedJobs, fetchState, getJobs } = useFetchData();
  const [jobs, setJobs] = useState<TJobData[]>([]);
  const { fetchState, getJobs: fetchJobs } = useFetchData();
  const [jobPosition, setJobPosition] = useState<TJobPosition<number>>({
    lat: 52.390741909089954,
    lng: 4.937249840694807,
  });
  const [chosenJob, setChosenJob] = useState<TJobData>({} as TJobData);

  useEffect(() => {
    const transformJobs = (jobsObj: TJobData[]) => {
      const dataWithID = jobsObj.map((job) =>
        Object.assign({ id: uniqueId() }, job)
      );
      setJobs(dataWithID);
      console.log(dataWithID);
    };
    console.log(fetchState);
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
  const findJobPosition = (job: TJobData) => {
    const gCoordinate = {
      lat: Number(job.location_coordinates[0]),
      lng: Number(job.location_coordinates[1]),
    };
    setJobPosition(gCoordinate);
    setChosenJob(job);
  };
  return (
    <div className="app-container">
      <Header
        logo={{
          link: "/",
          src: "https://www.jobfeed.nl/images/jobfeed-logo.svg",
          title: "Jobfeed",
        }}
      ></Header>

      <div className="main-content">
        <div className="job-listing">
          {fetchState === EFetchState.LOADING && (
            <>
              <ContentPlaceholder
                duration={1}
                height={undefined}
                width={100}
                withoutMargin={false}
              />
              <ContentPlaceholder
                duration={1}
                height={undefined}
                width={55}
                withoutMargin={false}
              />
              <ContentPlaceholder
                duration={1}
                height={undefined}
                width={65}
                withoutMargin
              />
            </>
            // <LoadingSpinner
            //   centerIn={undefined}
            //   context="primary"
            //   hidden={false}
            //   size={64}
            // >
            //   Loading...
            // </LoadingSpinner>
          )}
          {fetchState === EFetchState.ERROR && (
            <div>Error in retrieving jobs</div>
          )}
          {fetchState === EFetchState.SUCCESS &&
            jobs?.map((job) => (
              <MemoizedCard
                key={job.id}
                job={job}
                onRemove={deleteJobHandler}
                onSelect={findJobPosition}
              />
            ))}
        </div>
        <MemoizedMap
          job={chosenJob}
          location={jobPosition}
          position={jobPosition}
        />
      </div>
    </div>
  );
}

export default App;
