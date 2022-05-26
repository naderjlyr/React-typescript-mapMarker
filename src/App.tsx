import React, { useEffect, useState } from "react";
import { useFetchData } from "./hooks/useApi";
import { EFetchState, TJobData, TJobPosition } from "./types/data-models";
import {
  LoadingSpinner,
  Header,
  Heading,
  IconJobfeed,
  ContentPlaceholder,
} from "@textkernel/oneui";
import { MemoizedCard } from "./components/CardItem";
import MemoizedMap from "./components/LeafletMap";
import "@textkernel/oneui/dist/oneui.min.css";
import "./App.scss";
import uniqueId from "./helpers/id-generator";
import SearchInput from "./components/SearchInput";
function App() {
  const [jobs, setJobs] = useState<TJobData[]>([]);
  const { fetchState, getJobs: fetchJobs } = useFetchData();
  const [jobPosition, setJobPosition] = useState<TJobPosition<number>>({
    lat: 52.390741909089954,
    lng: 4.937249840694807,
  });
  const [chosenJob, setChosenJob] = useState<TJobData>({} as TJobData);
  const [searchedJobs, setSearchedJobs] = useState<Array<TJobData>>(
    [] as Array<TJobData>
  );

  useEffect(() => {
    const transformJobs = (jobsObj: TJobData[]) => {
      const dataWithID = jobsObj.map((job) =>
        Object.assign({ id: uniqueId() }, job)
      );
      setJobs(dataWithID);
      setSearchedJobs(dataWithID);
    };
    fetchJobs("info-recent-jobs", transformJobs);
  }, [fetchJobs]);

  const filterBySearch = (searchQuery: string) => {
    const searchFilter = jobs.filter((job) => {
      return (
        job?.organization_name
          ?.toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        job?.job_title?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    });

    setSearchedJobs(searchFilter);
  };

  const deleteJobHandler = (job: TJobData) => {
    const newJobs = searchedJobs.filter((originalJob) => {
      return job.id !== originalJob.id;
    });
    setSearchedJobs(newJobs);
  };

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
        className="cm-header"
        logo={{
          link: "/",
          src: "https://www.jobfeed.nl/images/jobfeed-logo.svg",
          title: "Jobfeed",
        }}
      ></Header>
      <div className="main-content">
        <div className="job-listing">
          <div className="cm-search-container">
            <SearchInput onSearch={filterBySearch} />
          </div>
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
          )}
          {fetchState === EFetchState.ERROR && (
            <div>Error in retrieving jobs</div>
          )}
          {fetchState === EFetchState.SUCCESS &&
            searchedJobs?.map((job) => (
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
