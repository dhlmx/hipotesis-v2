import { distance } from '../../utilities/math';
import { IKNearestNeighbor } from '../../interfaces/ml/ik-nearest-neighbor';
import { IKNearestNeighborPrediction } from '../../interfaces/ml/ik-nearest-neighbor-prediction';
import { IKNearestNeighborSummary } from '../../interfaces/ml/ik-nearest-neighbor-summary';

export class KNearestNeighborAlgorithm {
  // Initial conditions
  private _k: number = -1;
  private _points: number[][] = [];
  private _labels: string[] = [];
  // Results
  private _neighbors: IKNearestNeighbor[] = [];
  private _preSummary: any = {};
  private _summary: IKNearestNeighborSummary[] = [];;
  private _prediction: string = '';

  get neighbors(): IKNearestNeighbor[] { return this._neighbors; }

  get prediction(): string { return this._prediction; }

  get summary(): IKNearestNeighborSummary[] { return this._summary; }

  info = (): IKNearestNeighborPrediction => ({
    k: this._k,
    neighbors: this._neighbors,
    summary: this._summary,
    label: this._prediction,
    points: this._points,
    labels: this._labels
  });

  init = (k: number, points: number[][], labels: string[]): void => {
    this._k = k;
    this._points = points;
    this._labels = labels;
  }

  predict = (point: number[]): void => {
    const map: IKNearestNeighbor[] = this.mapDistance(point);

    this._neighbors = map.slice(0, this._k);
    this._preSummary = this._neighbors.reduce((accumulator: any, neighbor: IKNearestNeighbor) =>
            ({ ...accumulator, [neighbor.label]: (accumulator[neighbor.label] || 0) + 1 }),
            {}
          );
    this._summary = Object.keys(this._preSummary).map(key => ({ label: key, count: this._preSummary[key] }))
        .sort((a, b) => a.count > b.count ? -1 : 1);

    this._prediction = this._summary[0].label;
  }

  // Private methods
  private mapDistance = (point: number[]): IKNearestNeighbor[] => {
    const map: IKNearestNeighbor[] = [];
    let maxDistance = -1;

    this._points.forEach((otherPoint, index) => {
      const otherLabel = this._labels[index],
            distanceToOtherPoint = distance(point, otherPoint);

      if (maxDistance === -1 || distanceToOtherPoint < maxDistance) {
        map.push({
          index,
          distance: distanceToOtherPoint,
          label: otherLabel
        });

        map.sort((a, b) => a.distance < b.distance ? -1 : 1);

        if (map.length > this._k) {
          map.pop();
        }

        maxDistance = map.at(-1)?.distance ?? -1;
      }
    });

    return map;
  };
}
