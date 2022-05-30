import { useState, useEffect } from "react";
import CardItem from "./CardItem";
import SearchInput from "./SearchInput";
import { jobActions, retrieveJobs } from "../features/slices/jobSlice";
import ContentPlaceHolder from "./ContentPlaceHolder";
import { IoSearchCircleSharp, IoClose } from "react-icons/io5";
import {
  RootState,
  selectJobsStatus,
  selectTargetJob,
  useAppDispatch,
} from "../features/store";
import { useSelector } from "react-redux";
import { JobData } from "../models/job.model";
import usePagination from "../hooks/usePagination";
import { Pagination } from "@textkernel/oneui";
import { useMediaQuery } from "react-responsive";
const CardsList = () => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [boxToggle, setBoxToggle] = useState<boolean>(true);
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1024px)" });
  const jobFetchStatus = useSelector(selectJobsStatus);
  const dispatch = useAppDispatch();
  const targetJob = useSelector(selectTargetJob);
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
  const { current, pages, display, set } = usePagination({
    items: jobs,
    size: 10,
  });
  const renderJobItems = display.map((job: JobData) => {
    return <CardItem key={job.id} job={job} />;
  });

  const initFetch = async () => {
    await dispatch(retrieveJobs());
  };
  useEffect(() => {
    initFetch();
  }, [dispatch]);
  useEffect(() => {
    return () => {
      setBoxToggle(!boxToggle);
    };
  }, [targetJob]);

  const filterBySearch = (searchQuery: string) => {
    setSearchValue(searchQuery);
  };

  return (
    <>
      {!boxToggle && isTabletOrMobile ? (
        <div className="search-icon-container">
          <IoSearchCircleSharp
            size={70}
            onClick={() => setBoxToggle((prev) => !boxToggle)}
          />
        </div>
      ) : (
        ""
      )}
      <div
        className={
          !boxToggle && isTabletOrMobile ? "job-listing close" : "job-listing"
        }
      >
        {boxToggle && isTabletOrMobile ? (
          <div className="close-icon-container">
            <IoClose
              size={25}
              onClick={() => setBoxToggle((prev) => !boxToggle)}
            />
          </div>
        ) : (
          ""
        )}
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
          totalPages={pages}
        />
        {<ContentPlaceHolder fetchState={jobFetchStatus} />}
        {renderJobItems}
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
          totalPages={pages}
        />
      </div>
    </>
  );
};
export default CardsList;
