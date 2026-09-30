import { IAllocation } from '../../interfaces/ml/iallocation';
import { IKMeans } from '../../interfaces/ml/ik-means';
import { IKMeansLog } from '../../interfaces/ml/ik-means-log';
import { IPoint2D } from '../../interfaces/ml/ipoint-2d';
import { IPoint3D } from '../../interfaces/ml/ipoint-3d';
import { IRange } from '../../interfaces/ml/irange';
import { distance, mean, random } from '../../utilities/math';

export class KMeansAlgorithm {
  private _points: number[][] = [];
  private _kMeans: IKMeans = {} as IKMeans;
  private _kMeansByRange: IKMeans|null = null;

  get centroids(): number[][] {
    return this._kMeans.centroids
  };

  get centroids2D(): IPoint2D[] {
    return this.centroids.map(centroid => ({ x: centroid[0], y: centroid[1] }));
  }

  get centroids3D(): IPoint3D[] {
    return this.centroids.map(centroid => ({ x: centroid[0], y: centroid[1], z: centroid[2] }));
  }

  get error(): number {
    return this._kMeans.error;
  }

  get isStable(): boolean {
    return this._kMeans.allocations.every(allocation => allocation.isReassignment === false);
  }

  get iterations(): number {
    return this._kMeans.iterations;
  }

  get logIterations(): number[] {
    return this._kMeans.logs.map(log => log.iteration);
  }

  get logRMSEs(): number[] {
    return this._kMeans.logs.map(log => log.rmse);
  }

  get points(): number[][] {
    return this._points;
  }

  get points2D(): IPoint2D[] {
    return this._points.map(point => ({ x: point[0], y: point[1] }));
  }

  get points3D(): IPoint3D[] {
    return this._points.map(point => ({ x: point[0], y: point[1], z: point[1] }));
  }

  info = (): IKMeans => this._kMeans;

  init = (points: number[][], k: number, iterations: number): void => {
    this._points = points;
    this._kMeans.k = k;
    this._kMeans.kMin = 0;
    this._kMeans.kMax = 0;
    this._kMeans.trials = 0;
    this._kMeans.iterations = iterations;
    this._kMeans.dimensionality = this.getDimensionality();
    this._kMeans.ranges = this.getRanges();
    this._kMeans.previousCentroids = [];
    this._kMeans.centroids = [];
    this._kMeans.allocations = this.points.map(point =>
      ({ point, minDistance: -1, maxDistance: -1, previousCentroid: -1, nearestCentroid: -1, farthestCentroid: -1, isReassignment: false } as IAllocation)
    );
    this._kMeans.error = -1;
    this._kMeansByRange = null;
    this._kMeans.logs = [];
  };

  initByKsRange = (points: number[][], kMin: number, kMax: number, trials: number, iterations: number): void => {
    this._points = points;
    this._kMeans.k = 0;
    this._kMeans.kMin = kMin;
    this._kMeans.kMax = kMax;
    this._kMeans.trials = trials;
    this._kMeans.iterations = iterations;
    this._kMeans.dimensionality = this.getDimensionality();
    this._kMeans.ranges = this.getRanges();
    this._kMeans.previousCentroids = [];
    this._kMeans.centroids = [];
    this._kMeans.allocations = this.points.map(point =>
      ({ point, minDistance: -1, maxDistance: -1, previousCentroid: -1, nearestCentroid: -1, farthestCentroid: -1, isReassignment: false } as IAllocation)
    );
    this._kMeans.error = -1;
    this._kMeansByRange = null;
    this._kMeans.logs = [];
    };

  reset = (): void => {
    this._kMeans.k = 0;
    this._kMeans.kMin = 0;
    this._kMeans.kMax = 0;
    this._kMeans.trials = 0;
    this._kMeans.iterations = 0;
    this._kMeans.dimensionality = 0;
    this._kMeans.ranges = [];
    this._kMeans.previousCentroids = [];
    this._kMeans.centroids = [];
    this._kMeans.allocations = [];
    this._kMeans.error = -1;
    this._kMeansByRange = null;
    this._kMeans.logs = [];
  };

  solve = (trial: number = 0): void => {
    this.getRandomCentroids();

    let iteration = 0,
        log: IKMeansLog = { k: this._kMeans.k, trial, iteration: 0, rmse: -1, isStable: false };

    while (iteration <= this._kMeans.iterations) {
      this.assignPointsToCentroids();
      this.updateCentroidLocations();
      this.calculateRMSE();

      iteration++;

      log.iteration = iteration;
      log.rmse = this._kMeans.error;
      log.isStable = this.isStable;
      this._kMeans.logs.push({ ...log });

      if (iteration >= 2 && this.isStable) {
        break;
      }
    }
  };

  solveByKsRange = (): void => {
    for (let k = this._kMeans.kMin; k < this._kMeans.kMax; k++) {
      for (let trial = 0; trial < this._kMeans.trials; trial++) {
        this.init(this._points, k, this._kMeans.iterations);
        this.solve(trial);

        if (this._kMeansByRange === null || (this._kMeans.error < this._kMeansByRange.error)) {
          this._kMeansByRange = { ...this._kMeans };
        }
      }
    }
  };

  // Private Methods
  private assignPointsToCentroids = (): void => {
    this._kMeans.allocations.forEach(allocation => {
      let minDistance = -1,
          maxDistance = -1,
          nearestCentroid = -1,
          farthestCentroid = -1;

      this._kMeans.centroids.forEach((centroid, centroidIndex) => {
        const distanceToCentroid = distance(allocation.point, centroid);

        if (minDistance === -1 || distanceToCentroid < minDistance) {
          minDistance = distanceToCentroid;
          nearestCentroid = centroidIndex;
        }

        if (farthestCentroid === -1 || distanceToCentroid > maxDistance) {
          maxDistance = distanceToCentroid;
          farthestCentroid = centroidIndex;
        }
      });

      allocation.minDistance = minDistance;
      allocation.maxDistance = maxDistance;
      allocation.isReassignment = allocation.nearestCentroid !== -1 && allocation.nearestCentroid !== nearestCentroid;
      allocation.previousCentroid = allocation.nearestCentroid;
      allocation.nearestCentroid = nearestCentroid;
      allocation.farthestCentroid = farthestCentroid;
    });
  }

  private calculateRMSE = (): void => {
    let sumOfDistancesSquared = 0;

    this._kMeans.allocations.forEach(allocation => {
      const centroid = this._kMeans.centroids[allocation.nearestCentroid],
            distanceToCentroid = distance(allocation.point, centroid);

      allocation.minDistance = distanceToCentroid;
      sumOfDistancesSquared += (allocation.minDistance * allocation.minDistance);
    });

    this._kMeans.error = Math.sqrt(sumOfDistancesSquared / this._points.length);
  }

  private getDimension = (dimension: number): number[] => {
    return this._points.map(serie => serie[dimension]);
  };

  private getDimensionality = (): number => {
    return this._points.length === 0 ? 0 : this._points[0].length;
  };

  private getPointsByCentroid = (centroidIndex: number): number[][] => {
    return this._kMeans.allocations.filter(allocation => allocation.nearestCentroid === centroidIndex).map(allocation => allocation.point);
  };

  private getRandomCentroids = (): void => {
    this._kMeans.centroids = [];

    for (let i = 0; i < this._kMeans.k; i++) {
      const centroid: number[] = this._kMeans.ranges.map(range => this.getRandomInRange(range));
      this._kMeans.centroids.push(centroid);
    }
  };

  private getRandomInRange = (range: IRange): number => {
    return random(range.min, range.max);
  };

  private getRange = (dimension: number[]): IRange => {
    return {
      min: Math.min.apply(null, dimension),
      max: Math.max.apply(null, dimension)
    };
  };

  private getRanges = (): IRange[] => {
    const ranges: IRange[] = [];

    for (let dimension = 0; dimension < this._kMeans.dimensionality; dimension++) {
      ranges.push(this.getRange(this.getDimension(dimension)));
    }

    return ranges;
  };

  private updateCentroidLocations = (): void => {
    this._kMeans.centroids.flatMap(centroid => (this._kMeans.previousCentroids.push(centroid)));

    this._kMeans.centroids.forEach((centroid, index) => {
      const meanCentroid: number[] = [];

      for (let dimension = 0; dimension < this._kMeans.dimensionality; dimension++) {
        meanCentroid[dimension] = mean(this.getPointsByCentroid(index).map(point => point[dimension]));
      }

      this._kMeans.centroids[index] = meanCentroid;
    });
  };
}
