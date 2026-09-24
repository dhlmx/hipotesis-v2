export interface IAllocation {
  point: number[];
  minDistance: number;
  maxDistance: number;
  previousCentroid: number;
  nearestCentroid: number;
  farthestCentroid: number;
  isReassignment: boolean;
}
