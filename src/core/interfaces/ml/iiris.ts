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
  const source = iris as IIris;

  return source.id !== undefined
    && source.sepalLengthCm !== undefined
    && source.sepalWidthCm !== undefined
    && source.petalLengthCm !== undefined
    && source.petalWidthCm !== undefined
    && source.species !== undefined;
};
