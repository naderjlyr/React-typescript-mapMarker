export enum EFetchState {
  DEFAULT = "DEFAULT",
  LOADING = "LOADING",
  SUCCESS = "SUCCESS",
  ERROR = "ERROR",
}
export type TJobData = {
  id?: number;
  job_title: string;
  organization_name: string;
  location_coordinates: string[];
};
