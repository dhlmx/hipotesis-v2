import { IEdge } from '../../interfaces/math/iedge';
import { Apex } from './apex';

export class Edge {
  start = new Apex();
  end = new Apex();

  constructor(source?: IEdge) {
    if (source) {
      this.start = source.start;
      this.end = source.end;
    }
  }
}
