import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import uniqueId from "../../helpers/id-generator";
import { JobData, JobPosition } from "../../models/job.model";
import JobService from "../services/JobService";
export const retrieveJobs = createAsyncThunk<JobData[]>(
  "jobs/getAll",
  async () => {
    const response = await JobService.getAll();
    return response.data;
  }
);

export interface InitialState {
  jobs: JobData[];
  status: "done" | "idle" | "loading";
  error: string | null;
  isActiveOnMap: number;
  targetedLocation: JobPosition;
  searchResult: JobData[];
}

const initialState: InitialState = {
  jobs: [],
  status: "idle",
  error: null,
  isActiveOnMap: 0,
  targetedLocation: {
    id: 0,
    job_title: "Frontend Developer",
    organization_name: "Textkernel",
    lat: 52.39058850930055,
    lng: 4.93727226228314,
  },
  searchResult: [],
};

const jobSlice = createSlice({
  name: "jobs",
  initialState,
  reducers: {
    onRemove(state, action) {
      state.jobs = state.jobs.filter((job) => job.id !== action.payload);
    },
    findPosition(state, { payload }) {
      state.targetedLocation = {
        id: payload.id,
        job_title: payload.job_title,
        organization_name: payload.organization_name,
        lat: Number(payload.location_coordinates[0]),
        lng: Number(payload.location_coordinates[1]),
      };
    },
    filterBySearch(state, action) {
      const searchFilter = state.jobs.filter((job) => {
        return (
          job?.organization_name
            ?.toLowerCase()
            .includes(action.payload.toLowerCase()) ||
          job?.job_title?.toLowerCase().includes(action.payload.toLowerCase())
        );
      });
      state.searchResult = searchFilter;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(retrieveJobs.rejected, (state, action) => {
      state.error = action.error.message || "error";
      state.status = "idle";
    });
    builder.addCase(retrieveJobs.pending, (state) => {
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(
      retrieveJobs.fulfilled,
      (state, action: PayloadAction<JobData[]>) => {
        const dataWithID = action.payload.map((job) =>
          Object.assign({ id: uniqueId() }, job)
        );
        state.jobs = dataWithID;
        state.searchResult = dataWithID;
        state.status = "done";
        state.error = null;
      }
    );
  },
});
export const jobActions = jobSlice.actions;
export default jobSlice.reducer;
