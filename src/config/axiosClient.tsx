import axios from "axios";
const jobFeedConfig = {
  baseUrl: "https://us.jobfeed.com/data/",
};

const axiosClient = axios.create({
  baseURL: jobFeedConfig.baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});
axiosClient.interceptors.request.use(async (config) => config);

export default axiosClient;
