export interface IHttpFileOptions {
  responseType: 'blob'|'arraybuffer',
  observe: 'body'|'events'|'response',
  withCredentials: boolean
}
