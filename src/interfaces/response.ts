export type ResponseData<T> = {  
  error: string;
} | {
  data: T;
} | {
  message?: string;
}