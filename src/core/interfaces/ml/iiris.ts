export interface IIris {
  id: number;
  sepalLengthCm: number;
  sepalWidthCm: number;
  petalLengthCm: number;
  petalWidthCm: number;
  species: string;
}

export const IIRIS: IIris = {
  id: 0,
  sepalLengthCm: 0,
  sepalWidthCm: 0,
  petalLengthCm: 0,
  petalWidthCm: 0,
  species: ''
};

export const isIIris = (iris: any): iris is IIris => {
  const test = iris as IIris;

  return test.id !== undefined
    && test.sepalLengthCm !== undefined
    && test.sepalWidthCm !== undefined
    && test.petalLengthCm !== undefined
    && test.petalWidthCm !== undefined
    && test.species !== undefined;
};
