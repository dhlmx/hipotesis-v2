import { HttpErrorResponse } from '@angular/common/http';
import { IPhpError } from '../interfaces/php/iphp-error';
import { IPhpJsonSintaxError } from '../interfaces/php/iphp-json-sintax-error';

export type ErrorType = Error | ErrorEvent | HttpErrorResponse | IPhpError | IPhpJsonSintaxError;
