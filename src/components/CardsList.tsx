import React, { useState, useEffect } from "react";
import CardItem from "./CardItem";
import SearchInput from "./SearchInput";
import { retrieveJobs } from "../features/slices/jobSlice";
import {
  LoadingSpinner,
  Header,
  Heading,
  IconJobfeed,
  ContentPlaceholder,
} from "@textkernel/oneui";
import { RootState, selectJobs, useAppDispatch } from "../features/store";
import { useSelector } from "react-redux";
import { JobData } from "../models/job.model";
const CardsList = () => {
  const [searchValue, setSearchValue] = useState<string>("");

  const dispatch = useAppDispatch();
  const jobs = useSelector((state: RootState) => {
    if (searchValue.length === 0) {
      return state.jobs.jobs;
    }
    return state.jobs.jobs.filter((job) => {
      return (
        job?.organization_name
          ?.toLowerCase()
          .includes(searchValue.toLowerCase()) ||
        job?.job_title?.toLowerCase().includes(searchValue.toLowerCase())
      );
    });
  });
  const renderJobItems = jobs.map((job: JobData) => {
    return <CardItem key={job.id} job={job} />;
  });

  const initFetch = async () => {
    await dispatch(retrieveJobs());
  };
  useEffect(() => {
    initFetch();
  }, [dispatch]);

  useEffect(() => {
    console.log("Kboom!");
  }, [jobs]);
  const filterBySearch = (searchQuery: string) => {
    setSearchValue(searchQuery);
  };
  // setSearchedJobs(searchFilter);

  return (
    <>
      <div className="job-listing">
        <div className="cm-search-container">
          <SearchInput onSearch={filterBySearch} />
        </div>
        {renderJobItems}
        {/* {fetchState === FetchStatus.LOADING && (
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
      )} */}
      </div>
    </>
  );
};
export default CardsList;
