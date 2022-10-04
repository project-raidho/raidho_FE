import axios, { AxiosRequestConfig } from "axios";

const URI = process.env.REACT_APP_BASE_URI;

// 단순 get요청으로 인증값이 필요없는 경우
const axiosApi = (
  url: string | undefined,
  options?: AxiosRequestConfig<any>
) => {
  const instance = axios.create({ baseURL: url, ...options });
  return instance;
};

// post, delete등 api요청 시 인증값이 필요한 경우
const axiosAuthApi = (
  url: string | undefined,
  options?: AxiosRequestConfig<any>
) => {
  const instance = axios.create({
    baseURL: url,
    // headers: { Authorization: token },
    ...options,
  });

  instance.interceptors.request.use(
    (config) => {
      if (!config.headers) {
        config.headers = {};
      }

      config.headers["Authorization"] = `${localStorage.getItem(
        "Authorization"
      )}`;

      config.headers["RefreshToken"] = `${localStorage.getItem(
        "refreshToken"
      )}`;

      return config;
    },
    (err) => {
      return Promise.reject(err);
    }
  );

  return instance;
};

export const instance = axiosApi(URI);
export const authInstance = axiosAuthApi(URI);
