import { getNewAccessToken } from "@/services/authService";
import axios from "axios"
import { cookies } from "next/headers";
// export const axiosPublic = axios.create({baseURL: 'https://pet-care-server-nu.vercel.app'});
// export const axiosSecure = axios.create({baseURL: 'https://pet-care-server-nu.vercel.app', withCredentials: true});
export const axiosPublic = axios.create({baseURL: 'http://localhost:5000'});
export const axiosSecure = axios.create({baseURL: 'http://localhost:5000', withCredentials: true});


axiosSecure.interceptors.request.use(
  function (config) {
    const cookieStore = cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axiosSecure.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error) {
    const config = error.config;

    if (error?.response?.status === 401 && !config?.sent) {
      config.sent = true;
      const res = await getNewAccessToken();
      const accessToken = res.data.accessToken;

      config.headers["Authorization"] = `Bearer ${accessToken}`;
      cookies().set("accessToken", accessToken);

      return axiosSecure(config);
    } else {
      return Promise.reject(error);
    }
  }
);

