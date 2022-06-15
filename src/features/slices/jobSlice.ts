import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import uniqueId from "../../helpers/id-generator";
import { JobData, JobPosition, FetchStatus } from "../../models/job.model";
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
  status: FetchStatus;
  error: string | null;
  isActiveOnMap: number;
  targetedLocation: JobPosition;
  searchResult: JobData[];
}

const initialState: InitialState = {
  jobs: [],
  status: FetchStatus.DEFAULT,
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
    onRemove(state, { payload }) {
      return {
        ...state,
        jobs: [...state.jobs].filter((job) => job.id !== payload),
        searchResult: [...state.searchResult].filter(
          (job) => job.id !== payload
        ),
      };
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

    searchResult(state, { payload }) {
      const searchedJobs = state.jobs.filter(
        (job) =>
          job?.job_title?.toLowerCase().includes(payload.toLowerCase()) ||
          job?.organization_name
            ?.toLocaleLowerCase()
            .includes(payload.toLocaleLowerCase())
      );
      return {
        ...state,
        searchResult:
          payload.length >= 0 ? searchedJobs : [...state.searchResult],
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(retrieveJobs.rejected, (state, action) => {
      state.status = FetchStatus.DEFAULT;
    });
    builder.addCase(retrieveJobs.pending, (state) => {
      state.status = FetchStatus.LOADING;
    });
    builder.addCase(
      retrieveJobs.fulfilled,
      (state, action: PayloadAction<JobData[]>) => {
        const dataWithID = action.payload.map((job) =>
          Object.assign({ id: uniqueId() }, job)
        );
        state.jobs = dataWithID;
        state.searchResult = dataWithID;

        state.status = FetchStatus.SUCCESS;
      }
    );
  },
});
export const jobActions = jobSlice.actions;
export default jobSlice.reducer;
