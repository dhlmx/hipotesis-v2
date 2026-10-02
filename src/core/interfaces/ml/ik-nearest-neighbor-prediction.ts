import { IKNearestNeighbor } from './ik-nearest-neighbor';
import { IKNearestNeighborSummary } from './ik-nearest-neighbor-summary';

export interface IKNearestNeighborPrediction {
  k: number;
  neighbors: IKNearestNeighbor[];
  summary: IKNearestNeighborSummary[];
  label: string;
  points: number[][];
  labels: string[];
}
