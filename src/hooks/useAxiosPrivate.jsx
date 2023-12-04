import axios from "axios";

const axiosPrivate = axios.create({
    baseURL: "https://server-survey.vercel.app"
})

const useAxiosPrivate = () => {
    return axiosPrivate;
};

export default useAxiosPrivate;