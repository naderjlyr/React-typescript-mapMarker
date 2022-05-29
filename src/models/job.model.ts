//API Interfaces

export enum FetchStatus {
  DEFAULT = "DEFAULT",
  LOADING = "LOADING",
  SUCCESS = "SUCCESS",
  ERROR = "ERROR",
}
export interface JobData {
  id?: number;
  job_title: string;
  organization_name: string;
  location_coordinates?: number[];
}

export interface JobPosition extends JobData {
  lat: number;
  lng: number;
}
