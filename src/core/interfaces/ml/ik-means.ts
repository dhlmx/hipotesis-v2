import { IKMeansLog } from "./ik-means-log";
import { IRange } from "./irange";

export interface IKMeans {
  k: number;
  maxOfIterations: number;
  dimensionality: number;
  ranges: IRange[];
  logs: IKMeansLog[];
}
