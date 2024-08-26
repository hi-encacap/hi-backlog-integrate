import { cookies } from "next/headers";

import { env } from "@/libs";

import Axios from "./instance";

const nulabRequest = Object.freeze(new Axios(env.NEXT_PUBLIC_NULAB_BASE_URL));

nulabRequest.instance.interceptors.request.use(
  (config) => {
    const cookieStore = cookies();
    const token = cookieStore.get("nulab-auth-token");
    const { headers } = config;

    if (token?.value && !headers["Authorization"]) {
      config.headers["Authorization"] = `Bearer ${token.value}`;
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

nulabRequest.instance.interceptors.response.use(
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

export default nulabRequest;
