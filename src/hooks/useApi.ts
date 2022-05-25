import axios from "axios";
import { useState } from "react";
import { EFetchState, TJobData } from "../types/api";

export function useFetchData() {
  const [fetchState, setFetchState] = useState(EFetchState.DEFAULT);
  const [jobs, setJobs] = useState<TJobData[]>([]);
  //   const [jobs, setJobs] = useState<Array<TJobData>>([]);

  const getJobs = async () => {
    try {
      setFetchState(EFetchState.LOADING);

      const res = await axios.get(
        "https://us.jobfeed.com/data/info-recent-jobs"
      );
      const resData = res.data as Array<TJobData>;

      setJobs(resData);
      setFetchState(EFetchState.SUCCESS);
    } catch (err) {
      setFetchState(EFetchState.ERROR);
    }
  };

  return [jobs, fetchState, getJobs] as const;
}
