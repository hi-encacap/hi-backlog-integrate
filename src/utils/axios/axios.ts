import { env } from "@/libs";
import Axios from "./instance";

const axios = Object.freeze(new Axios(env.NEXT_PUBLIC_API_BASE_URL));

export default axios;
