import { useState } from "react";
import { EFetchState, TJobData } from "../types/api";
import axiosClient from "../config/axiosClient";
import uniqueId from "../helpers/id-generator";
export function useFetchData() {
  const [fetchState, setFetchState] = useState(EFetchState.DEFAULT);
  const [jobs, setJobs] = useState<TJobData[]>([]);
  //   const [jobs, setJobs] = useState<Array<TJobData>>([]);

  const getJobs = async () => {
    try {
      setFetchState(EFetchState.LOADING);

      const res = await axiosClient.get("info-recent-jobs");
      const resData = res.data as Array<TJobData>;
      let dataWithID = resData.map((job) =>
        Object.assign({ id: uniqueId() }, job)
      );
      setJobs(dataWithID);
      setFetchState(EFetchState.SUCCESS);
    } catch (err) {
      setFetchState(EFetchState.ERROR);
    }
  };

  return [jobs, fetchState, getJobs] as const;
}
