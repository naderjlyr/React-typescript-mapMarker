export enum EFetchState {
  DEFAULT = "DEFAULT",
  LOADING = "LOADING",
  SUCCESS = "SUCCESS",
  ERROR = "ERROR",
}
export type TJobData = {
  job_title: string;
  organization_name: string;
  location_coordinates: string[];
};
