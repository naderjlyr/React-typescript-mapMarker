import { useState, useCallback } from "react";
import { EFetchState, TJobData } from "../types/data-models";
import axiosClient from "../config/axiosClient";
export function useFetchData() {
  const [fetchState, setFetchState] = useState(EFetchState.DEFAULT);
  const [fetchedJobs, setFetchedJobs] = useState<TJobData[]>([]);
  const [jobs, setJobs] = useState<Array<TJobData>>([]);

  const getJobs = useCallback(async (url: string, applyData: Function) => {
    try {
      setFetchState(EFetchState.LOADING);
      const res = await axiosClient.get(url);
      const resData = res.data as Array<TJobData>;
      applyData(resData);
      setJobs(resData);
      setFetchState(EFetchState.SUCCESS);
    } catch (err) {
      setFetchState(EFetchState.ERROR);
    }
  }, []);

  return { fetchState, getJobs };
}