import { IKMeans } from '../../interfaces/ml/ik-means';
import { IKMeansLog } from '../../interfaces/ml/ik-means-log';
import { IPoint2D } from '../../interfaces/ml/ipoint-2d';
import { IRange } from '../../interfaces/ml/irange';
import { distance, random } from '../../utilities/math';

export class KMeansAlgorithm {
  private _points: number[][] = [];
  private _kMeans: IKMeans = {} as IKMeans;

  // private _error: any = null;
  get centroids(): number[][] { return this._kMeans.logs.map(log => log.centroid); };

  get centroidsXY(): IPoint2D[] {
    return this._kMeans.logs.map(log => ({ x: log.centroid[0], y: log.centroid[1] }));
  }

  get series(): number[][] { return this._points; }

  get seriesXY(): IPoint2D[] {
    return this._points.map(serie => ({ x: serie[0], y: serie[1] }));
  }

  assignPointsToCentroids = (): void => {
    this._points.forEach((point, pointIndex) => {
      let minimalDistance = -1,
          nearestCentroid = -1;

      this._kMeans.logs.forEach((log, logIndex) => {
        const distanceToCentroid = distance(point, log.centroid);

        if (minimalDistance === -1 || distanceToCentroid < minimalDistance) {
          minimalDistance = distanceToCentroid;
          nearestCentroid = logIndex;
        }
      });

      this._kMeans.logs[nearestCentroid].points.push(pointIndex);
    });
  }

  getRandomCentroids = (): void => {
    for (let k = 0; k < this._kMeans.k; k++) {
      const kMeansLog: IKMeansLog = {
        k: k + 1,
        points: [],
        centroid: []
      };

      const points: number[] = [];

      this._kMeans.ranges.forEach(range => {
        const random = this.getRandomInRange(range);
        kMeansLog.centroid.push(random);
        points.push(random);
      });

      kMeansLog.centroid = points;
      this._kMeans.logs.push(kMeansLog);
    }
  }

  info = (): IKMeans => this._kMeans;

  init = (k: number, points: number[][], maxOfIterations: number = 1000): void => {
    this._points = points;
    this._kMeans.k = k;
    this._kMeans.maxOfIterations = maxOfIterations;
    this._kMeans.dimensionality = this.getDimensionality();
    this._kMeans.ranges = this.getRanges();
    this._kMeans.logs = [];
  }

  reset = (): void => {
    this._kMeans.k = 0;
    this._kMeans.maxOfIterations = 0;
    this._kMeans.dimensionality = 0;
    this._kMeans.ranges = [];
    this._kMeans.logs = [];

    //this._error = null;
    //this._centroidAssignments = [];
  }

  // Private Methods
  private getDimension = (dimension: number): number[] => {
    return this._points.map(serie => serie[dimension]);
  }

  private getDimensionality = (): number => {
    return this._points.length === 0 ? 0 : this._points[0].length;
  }

  private getRandomInRange = (range: IRange): number => {
    return random(range.min, range.max);
  }

  private getRange = (dimension: number[]): IRange => {
    return {
      min: Math.min.apply(null, dimension),
      max: Math.max.apply(null, dimension)
    };
  }

  private getRanges = (): IRange[] => {
    const ranges: IRange[] = [];

    for (let dimension = 0; dimension < this._kMeans.dimensionality; dimension++) {
      ranges.push(this.getRange(this.getDimension(dimension)));
    }

    return ranges;
  }
}
