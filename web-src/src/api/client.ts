import axios from "axios";
import { camelToSnakeObj, snakeToCamelObj } from "@/utils/strings";

const API_SUFFIX = "./api/v1";

const axiosInstance = axios.create({
    // dev模式使用 localhost:8888/api/v1
    // 生产模式使用 ""，同源请求
    baseURL: API_SUFFIX,
    timeout: 10000,
});

axiosInstance.interceptors.request.use((config) => {
    if (config.data && typeof config.data === "object") {
        config.data = camelToSnakeObj(config.data);
    }
    if (config.params && typeof config.params === "object") {
        config.params = camelToSnakeObj(config.params);
    }
    return config;
});

axiosInstance.interceptors.response.use(
    (response) => {
        if (response.data && typeof response.data === "object") {
            response.data = snakeToCamelObj(response.data);
        }
        return response;
    },
    (error) => Promise.reject(error)
);

export default axiosInstance;