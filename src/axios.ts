import axios from "axios";

const instance = axios.create({
    baseURL: "https://backend-blog-gules.vercel.app/",
});

instance.interceptors.request.use((config) => {
    config.headers.Authorization = window.localStorage.getItem("token");
    return config;
});

export default instance;
