import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';

// Services & Utilities
import { CSVService } from './csv.service';
import { randomSeries } from '../utilities/random';

// Models & Interfaces & Types
import { IIRIS, IIris } from '../interfaces/ml/iiris';
type IrisSpecie = 'Iris-setosa' | 'Iris-versicolor' | 'Iris-virginica';


@Injectable({
  providedIn: 'root'
})
export class IrisService {

  private _iris: IIris[] = [];

  constructor(private readonly csv: CSVService) { }

  get measurements(): number[] {
    return this._iris.map(iris => iris.id);
  }

  get labels(): number[] {
    return this.species.map(specie => this.uniqueSpecies.indexOf(specie));
  }

  get numbers1D(): number[][] {
    return this._iris.map((iris: IIris) => [iris.sepalLengthCm]);
  }

  get numbers2D(): number[][] {
    return this._iris.map((iris: IIris) => [iris.sepalLengthCm, iris.sepalWidthCm]);
  }

  get numbers3D(): number[][] {
    return this._iris.map((iris: IIris) => [iris.sepalLengthCm, iris.sepalWidthCm, iris.petalLengthCm]);
  }

  get numbers4D(): number[][] {
    return this._iris.map((iris: IIris) => [iris.sepalLengthCm, iris.sepalWidthCm, iris.petalLengthCm, iris.petalWidthCm]);
  }

  get petalLengths(): number[] {
    return this._iris.map((iris: IIris) => iris.petalLengthCm);
  }

  get petalWidths(): number[] {
    return this._iris.map((iris: IIris) => iris.petalWidthCm);
  }

  get sepalLengths(): number[] {
    return this._iris.map((iris: IIris) => iris.sepalLengthCm);
  }

  get sepalWidths(): number[] {
    return this._iris.map((iris: IIris) => iris.sepalWidthCm);
  }

  get species(): string[] {
    return this._iris.map((iris: IIris) => iris.species);
  }

  get specimens(): IIris[] {
    return this._iris;
  }

  get uniqueSpecies(): string[] {
    return [...new Set(this._iris.map((iris: IIris) => iris.species))];
  }

  getNumber1D = (index: number): number[][] => [[this._iris[index].sepalLengthCm]];

  getNumber2D = (index: number): number[][] => [[this._iris[index].sepalLengthCm, this._iris[index].sepalWidthCm]];

  getNumber3D = (index: number): number[][] => [[this._iris[index].sepalLengthCm, this._iris[index].sepalWidthCm, this._iris[index].petalLengthCm]];

  getNumber4D = (index: number): number[][] => [[this._iris[index].sepalLengthCm, this._iris[index].sepalWidthCm, this._iris[index].petalLengthCm, this._iris[index].petalWidthCm]];

  getRandomSample = (size: number): {
    train: { measurements: number[], features: number[][], species: string[], labels: number[] },
    test: { measurements: number[], features: number[][], species: string[], labels: number[] }
   } => {
    const indexes: number[] = randomSeries(size, 0, this._iris.length - 1, false, true),
          trainData = this._iris.filter(iris => !indexes.includes(iris.id)),
          testData = this._iris.filter(iris => indexes.includes(iris.id));

    return {
      train: {
        measurements: trainData.map(iris => iris.id),
        features: trainData.map(iris => [iris.sepalLengthCm, iris.sepalWidthCm, iris.petalLengthCm, iris.petalWidthCm]),
        species: trainData.map(iris => iris.species),
        labels: trainData.map(iris => this.uniqueSpecies.indexOf(iris.species))
      },
      test: {
        measurements: testData.map(iris => iris.id),
        features: testData.map(iris => [iris.sepalLengthCm, iris.sepalWidthCm, iris.petalLengthCm, iris.petalWidthCm]),
        species: testData.map(iris => iris.species),
        labels: testData.map(iris => this.uniqueSpecies.indexOf(iris.species))
      }
    };
  }

  getSpecies = (index: number): string => this._iris[index].species;

  getPetalLengthBySpecie = (specie: IrisSpecie): number[] =>
    this._iris.filter((iris: IIris) => iris.species === specie).map((iris: IIris) => iris.petalLengthCm);

  getPetalWidthBySpecie = (specie: IrisSpecie): number[] =>
    this._iris.filter((iris: IIris) => iris.species === specie).map((iris: IIris) => iris.petalWidthCm);

  getSepalLengthBySpecie = (specie: IrisSpecie): number[] =>
    this._iris.filter((iris: IIris) => iris.species === specie).map((iris: IIris) => iris.sepalLengthCm);

  getSepalWidthBySpecie = (specie: IrisSpecie): number[] =>
    this._iris.filter((iris: IIris) => iris.species === specie).map((iris: IIris) => iris.sepalWidthCm);

  load = (path: string): Observable<void> => {
    return this.csv.loadLineByLine(path).pipe(
      map((lines: string[]) => {
        this._iris = this.toIris(lines);
        this._iris = this._iris.filter((iris: IIris) => iris.species !== '');
      }),
      catchError((err: any) => {
        console.error('load: ERROR', err);
        return of();
      })
    );
  }

  // Private methods
  private readonly lineToIris: Function = (line: string): IIris => {
    const fields = line.split(',');

    return fields.length === 6
      ? {
        id: Number(fields[0]),
        sepalLengthCm: Number(fields[1]),
        sepalWidthCm: Number(fields[2]),
        petalLengthCm: Number(fields[3]),
        petalWidthCm: Number(fields[4]),
        species: fields[5]
      }
      : IIRIS;
  };

  private readonly toIris: Function = (data: string[], hasTitle: boolean = true): IIris[] => {
    if (hasTitle) {
      data.shift();
    }
    return data.map(line => this.lineToIris(line));
  };
}
