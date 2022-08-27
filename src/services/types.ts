import { Method } from 'axios'
export interface IApiCall {
  url: string,
  method?: Method
}