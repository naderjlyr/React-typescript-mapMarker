import { useState, useEffect } from "react";
import CardItem from "./CardItem";
import SearchInput from "./SearchInput";
import { retrieveJobs } from "../features/slices/jobSlice";
import ContentPlaceHolder from "./ContentPlaceHolder";
import { RootState, selectJobsStatus, useAppDispatch } from "../features/store";
import { useSelector } from "react-redux";
import { JobData } from "../models/job.model";

const CardsList = () => {
  const [searchValue, setSearchValue] = useState<string>("");
  const jobFetchStatus = useSelector(selectJobsStatus);
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

  const filterBySearch = (searchQuery: string) => {
    setSearchValue(searchQuery);
  };

  return (
    <>
      <div className="job-listing">
        <div className="cm-search-container">
          <SearchInput onSearch={filterBySearch} />
        </div>
        {<ContentPlaceHolder fetchState={jobFetchStatus} />}
        {renderJobItems}
      </div>
    </>
  );
};
export default CardsList;
