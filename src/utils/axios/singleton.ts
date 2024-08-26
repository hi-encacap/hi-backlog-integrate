import axios, { AxiosInstance } from "axios";

class AxiosSingleton {
  private static instance: AxiosInstance;

  public static getInstance(): AxiosInstance {
    if (!AxiosSingleton.instance) {
      AxiosSingleton.instance = axios.create({
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
