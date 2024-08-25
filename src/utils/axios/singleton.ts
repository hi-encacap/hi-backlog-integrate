import axios, { AxiosInstance } from "axios";

import { env } from "@/libs/env";

class AxiosSingleton {
  private static instance: AxiosInstance;

  public static getInstance(): AxiosInstance {
    if (!AxiosSingleton.instance) {
      AxiosSingleton.instance = axios.create({
        baseURL: env.NEXT_PUBLIC_API_BASE_URL,
        timeout: 10000,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    return AxiosSingleton.instance;
  }
}

export default AxiosSingleton;
