import axios from "axios";
console.log(import.meta.env); // "123"
export const axiosInstance = axios.create({
    baseURL: import.meta.env.PROD
        ? import.meta.env.VITE_SERVER_PROD
        : import.meta.env.VITE_SERVER_DEV,
});
// export const axiosInstance = axios;

const fetcher = (url: string) => axiosInstance.get(url).then((res) => res.data);

export default fetcher;
