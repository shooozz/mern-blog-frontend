import axios from "axios";

// https://backend-blog-gules.vercel.app/
// http://localhost:4444/
const instance = axios.create({
    baseURL: "http://localhost:4444",
});

instance.interceptors.request.use((config) => {
    config.headers.Authorization = window.localStorage.getItem("token");
    return config;
});

export default instance;
