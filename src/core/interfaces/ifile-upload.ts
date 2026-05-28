export interface IFileUpload {
  mode: "basic" | "advanced";
  name: string;
  accept: string;
  maxFileSize: number;
  phpUrl: string;
  publicHtml: string;
}
