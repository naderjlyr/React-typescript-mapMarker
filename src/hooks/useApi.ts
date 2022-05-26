import { useState, useCallback } from "react";
import { EFetchState, TJobData } from "../types/data-models";
import axiosClient from "../config/axiosClient";
export function useFetchData() {
  const [fetchState, setFetchState] = useState(EFetchState.DEFAULT);
  const [fetchedJobs, setFetchedJobs] = useState<TJobData[]>([]);
  //   const [jobs, setJobs] = useState<Array<TJobData>>([]);

  const getJobs = useCallback(async (applyData: Function) => {
    try {
      setFetchState(EFetchState.LOADING);
      const res = await axiosClient.get("info-recent-jobs");
      const resData = res.data as Array<TJobData>;
      applyData(resData);
      setFetchState(EFetchState.SUCCESS);
    } catch (err) {
      setFetchState(EFetchState.ERROR);
    }
  }, []);

  return { fetchState, getJobs };
}
