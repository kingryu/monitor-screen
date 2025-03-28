import axios from "axios";
export type Params = { [key: string]: string | number };
export const GETNOBASE = async (url: string, params?: Params): Promise<any> => {
    try {
      const data = await axios.get(url, {
        params: params,
      });
      return data.data;
    } catch (error) {
      return Promise.reject(error);
    }
  };