import Cookies from "universal-cookie";

import { env } from "@/libs";

import Axios from "./instance";

const nulabRequestClient = Object.freeze(new Axios(env.NEXT_PUBLIC_NULAB_BASE_URL));

nulabRequestClient.instance.interceptors.request.use(
  (config) => {
    const cookieStore = new Cookies();
    const token = cookieStore.get("nulab-auth-token");
    const { headers } = config;

    if (token && !headers["Authorization"]) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    if (headers["Authorization"] === "!") {
      delete config.headers["Authorization"];
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

nulabRequestClient.instance.interceptors.response.use(
  (response) => {
    return {
      ...response,
      data: {
        data: response.data,
      },
    };
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default nulabRequestClient;
