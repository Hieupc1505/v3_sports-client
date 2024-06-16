// import { axiosInstance } from "~/services/fetcher";
// import axios from "axios";
import { axiosInstance } from "~/services/fetcher";

export const createProduct = async (
    url: string,
    { arg }: { arg: { title: string } }
) => {
    await axiosInstance.post(url, { title: arg.title });
};
