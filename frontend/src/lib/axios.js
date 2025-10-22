import axios from 'axios';

const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:5001" : "https://orbit-backend-snowy.vercel.app/api";



const axiosInstance = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
})

export {axiosInstance};