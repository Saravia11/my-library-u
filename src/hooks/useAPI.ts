import axios, { AxiosRequestConfig } from "axios";

const useAPI =
  () =>
  <T>(config: AxiosRequestConfig<any>) =>
    axios<T>({
      ...config,
      url: `${
        process.env.NODE_ENV == "development" ? "http://localhost:8000" : ""
      }${config.url}`,
    });
export default useAPI;
