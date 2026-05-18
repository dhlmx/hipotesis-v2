import { HttpResponseStatus } from '../../enums/http';
import { IHttpResponse } from '../../interfaces/http/ihttp-response';

export class HttpResponse implements IHttpResponse {

  status = '';
  code = 0;
  message = '';
  data: any = {};

  constructor(source?: IHttpResponse) {
    if (source) {
      this.status = source.status;
      this.code = source.code;
      this.message = source.message;
      this.data = source.data;
    }
  }

  get isOK(): boolean {
    return this.status === HttpResponseStatus.OK;
  }
}
