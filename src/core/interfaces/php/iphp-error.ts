import { IPhpJsonSintaxError } from "./iphp-json-sintax-error";

export interface IPhpError {
  error: IPhpJsonSintaxError;
  text: string;
}

