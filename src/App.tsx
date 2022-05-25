import React, { useEffect } from "react";
import { useFetchData } from "./hooks/useApi";
import { EFetchState, TJobData } from "./types/api";
import {
  LoadingSpinner,
  Header,
  Heading,
  IconJobfeed,
  Input,
} from "@textkernel/oneui";
import { MemoizedCard } from "./components/CardItem";

import "@textkernel/oneui/dist/oneui.min.css";
import "./App.scss";
function App() {
  const [jobs, fetchState, getJobs] = useFetchData();

  useEffect(() => {
    getJobs();
    console.log("something");
  }, []);
  return (
    <>
      <Header
        logo={{
          link: "/",
          src: "https://www.jobfeed.nl/images/jobfeed-logo.svg",
          title: "Jobfeed",
        }}
      >
        This is a placeholder for children
      </Header>

      <div className="container">
        <Heading align="left" context="default" level="h1">
          <IconJobfeed context="info" size={48} title="Jobfeed" />
          Latest <span>Jobs</span>
        </Heading>
        <Input
          context={undefined}
          disabled={false}
          isBlock={false}
          onChange={function noRefCheck() {}}
          placeholder="Some text goes here..."
          size="normal"
          type="text"
        />
        <div className="listing-container">
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
            jobs.map((job) => (
              <MemoizedCard
                key={job.id}
                job={job}
                onRemove={() => {
                  return;
                }}
                onSelect={() => {
                  return;
                }}
              />
            ))}
        </div>
        <div className="map-container">Map To Show</div>
      </div>
    </>
  );
}

export default App;
