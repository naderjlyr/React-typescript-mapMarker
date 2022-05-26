//API Interfaces

export enum EFetchState {
  DEFAULT = "DEFAULT",
  LOADING = "LOADING",
  SUCCESS = "SUCCESS",
  ERROR = "ERROR",
}
export type TJobData = {
  id?: number | string;
  job_title: string;
  organization_name: string;
  location_coordinates: number[];
};

export type TJobPosition<T extends string | number> = {
  lat: T;
  lng: T;
};
