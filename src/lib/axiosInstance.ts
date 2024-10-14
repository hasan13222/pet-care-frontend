import axios from "axios"
export const axiosPublic = axios.create({baseURL: 'https://pet-care-server-nu.vercel.app'});
export const axiosSecure = axios.create({baseURL: 'https://pet-care-server-nu.vercel.app', withCredentials: true});