import { AxiosResponse as BaseAxiosResponse } from "axios";

interface AxiosResponseMeta {
  records: number;
  page: number;
  pages: number;
  limit: number;
}

interface AxiosResponseData<TData = unknown> {
  data: TData;
  meta: AxiosResponseMeta;
}

type AxiosResponse<TData = unknown, TConfig = unknown> = BaseAxiosResponse<AxiosResponseData<TData>, TConfig>;

export type { AxiosResponse, AxiosResponseData, AxiosResponseMeta };
