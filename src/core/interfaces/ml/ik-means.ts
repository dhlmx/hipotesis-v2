import { IAllocation } from "./iallocation";
import { IKMeansLog } from "./ik-means-log";
import { IRange } from "./irange";

export interface IKMeans {
  k: number;
  kMin: number;
  kMax: number;
  trials: number;
  iterations: number;
  dimensionality: number;
  ranges: IRange[];
  previousCentroids: number[][];
  centroids: number[][];
  allocations: IAllocation[];
  error: number;
  logs: IKMeansLog[];
}
