import axiosClient from "../../config/axiosClient";
const getAll = () => {
  return axiosClient.get("/info-recent-jobs");
};

const JobService = {
  getAll,
};
export default JobService;
