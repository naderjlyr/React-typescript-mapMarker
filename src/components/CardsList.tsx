import { useState, useEffect, useRef, SyntheticEvent } from "react";
import CardItem from "./CardItem";
import SearchInput from "./SearchInput";
import { retrieveJobs } from "../features/slices/jobSlice";
import ContentPlaceHolder from "./ContentPlaceHolder";
import { RootState, selectJobsStatus, useAppDispatch } from "../features/store";
import { useSelector } from "react-redux";
import { JobData } from "../models/job.model";
import usePagination from "../hooks/usePagination";
import { Pagination } from "@textkernel/oneui";

const CardsList = () => {
  const paginationRef = useRef<HTMLElement>(null);
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
  const { current, pages, display, next, previous, set } = usePagination({
    items: jobs,
    size: 10,
  });
  const renderJobItems = display.map((job: JobData) => {
    return <CardItem key={job.id} job={job} />;
  });
  const paginateHandler = (event: SyntheticEvent<HTMLElement>) => {
    console.log(event);
  };
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
        <Pagination
          onClick={(e, page) => {
            if (page >= current) {
              set(page);
            } else if (page < current) {
              set(page);
            }
          }}
          align="center"
          currentPage={current}
          maxPageButtons={pages}
          nextLabel="Next"
          prevLabel="Previous"
          totalPages={pages}
        />
        {<ContentPlaceHolder fetchState={jobFetchStatus} />}
        {renderJobItems}
      </div>
    </>
  );
};
export default CardsList;
