import { keyboardImplementationWrapper } from "@testing-library/user-event/dist/keyboard";
import reducer, {
  jobActions,
  retrieveJobs,
} from "../../features/slices/jobSlice";
import { FetchStatus } from "../../models/job.model";
describe("jobSlice reducers and Thunk Actions test", () => {
  let initialState = {
    jobs: [
      {
        id: 1,
        job_title: "Sales and Commercial Associate - Hiring Now",
        organization_name: "Auto Plus",
        location_coordinates: ["40.91676712", "-74.171813965"],
      },
      {
        id: 2,
        job_title: "WordPress Developer",
        organization_name: "Auto Plus",
        location_coordinates: ["47.5487893", "-74.171813965"],
      },
    ],
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
  describe("Thunk Actions (Extra Reducers)", () => {
    test("sets loading true when retrieveJobs is pending", () => {
      const action = { type: retrieveJobs.pending.type };
      const state = reducer(initialState, action);
      expect(state).toEqual({ ...state, status: FetchStatus.LOADING });
    });

    test("sets jobs when retrieveJobs is fulfilled", () => {
      const action = {
        type: retrieveJobs.fulfilled.type,
        payload: [
          {
            id: 2,
            job_title:
              "Kerassentials : SCAM Revealed Warning! Does It Really Work?",
            organization_name: "University of California Police Department",
            location_coordinates: ["34.420829773", "-119.69818878"],
          },
        ],
      };
      const state = reducer(initialState, action);
      expect(state).toEqual({
        ...state,
        jobs: action.payload,
        status: FetchStatus.SUCCESS,
      });
    });

    test("sets status false when retrieve is rejected", () => {
      const rejectedAction = {
        type: retrieveJobs.rejected.type,
      };
      const state = reducer(initialState, rejectedAction);
      expect(state).toEqual({ ...state, status: FetchStatus.DEFAULT });
    });
  });

  describe("reducers (main reducers)", () => {
    test("onRemove reducer", () => {
      const action = {
        type: jobActions.onRemove.type,
        payload: {
          id: 2,
          job_title: "WordPress Developer",
          organization_name: "Auto Plus",
          location_coordinates: ["47.5487893", "-74.171813965"],
        },
      };
      const state = reducer(initialState, action);
      const removeJob = () => {
        let index = state.jobs.findIndex((job) => job.id === action.payload.id);
        return [...state.jobs.slice(0, index), ...state.jobs.slice(index + 1)];
      };
      let restOfTheJobs = removeJob();
      expect(restOfTheJobs).not.toBeNull();
    });

    test("findPosition reducer", () => {
      const action = {
        type: jobActions.findPosition.type,
        payload: {
          id: 2,
          job_title: "WordPress Developer",
          organization_name: "Auto Plus",
          location_coordinates: [100.5487893, -74.171813965],
        },
      };
      const state = reducer(initialState, action);
      expect(state.targetedLocation.lat).toEqual(
        action.payload.location_coordinates[0]
      );
      expect(state.targetedLocation.lng).toEqual(
        action.payload.location_coordinates[1]
      );
    });
  });
});
