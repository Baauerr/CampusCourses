import axios from "axios";
import { getTokenFromLocalStorage } from "../helpers/tokenHelper";

export const instance = axios.create({
    baseURL: "https://camp-courses.api.kreosoft.space",
});

instance.interceptors.request.use(config => {
    const token = getTokenFromLocalStorage();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});

export default instance