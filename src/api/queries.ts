import axios, {AxiosResponse} from "axios";

export const getDataDto = async (): Promise<AxiosResponse<unknown>> => {
  return axios({
    method: 'GET',
    url: import.meta.env.VITE_CONFIG_FILE_PATH,
  });
}
