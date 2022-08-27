import axios, { AxiosResponse, AxiosError } from 'axios'
import { BASE_API } from '../constants';
import { IApiCall } from './types';

export default function apiCall({
  url, method = 'GET'
}: IApiCall) {
  return axios({
    url: `${BASE_API}/${url}`,
    method
  }).then((response: AxiosResponse) => response.data)
  .catch((error: AxiosError) => {
    console.log(error)
  })
}