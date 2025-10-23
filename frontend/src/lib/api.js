import { axiosInstance } from "./axios.js";



export async function getStreamToken(){
   const response = await axiosInstance.get("/api/chat/token");
   return response.data;
}