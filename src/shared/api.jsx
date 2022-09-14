import axios from "axios";

const URI = process.env.REACT_APP_BASE_URI;

// 단순 get요청으로 인증값이 필요없는 경우
const axiosApi = (url, options) => {
  const instance = axios.create({ baseURL: url, ...options });
  return instance;
};

// post, delete등 api요청 시 인증값이 필요한 경우
const axiosAuthApi = (url, options) => {
  const token = localStorage.getItem("Authorization");
  const instance = axios.create({
    baseURL: url,
    headers: { Authorization: token },
    ...options,
  });

  instance.interceptors.request.use(
    (config) => {
      config.headers["Authorization"] = localStorage.getItem("Authorization");
      return config;
    },
    (err) => {
      return Promise.reject(err);
    }
  );

  return instance;
};

const axiosFormDataApi = (url, options) => {
  const instance = axios.create({
    baseURL: url,
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: localStorage.getItem("Authorization"),
    },
    ...options,
  });
  return instance;
};

export const instance = axiosApi(URI);
export const authInstance = axiosAuthApi(URI);
export const formDataInstance = axiosFormDataApi(URI);
