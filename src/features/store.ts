import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import jobSlice from "./slices/jobSlice";

const store = configureStore({
  reducer: {
    jobs: jobSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export const selectJobs = (state: RootState) => state.jobs.jobs;
export const selectTargetJob = (state: RootState) =>
  state.jobs.targetedLocation;
export const selectSearchResult = (state: RootState) => state.jobs.searchResult;

export default store;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
