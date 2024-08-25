import "axios";

declare module "axios" {
  export interface AxiosRequestConfig {
    // Custom config here.
    customConfig?: boolean;
  }
}
