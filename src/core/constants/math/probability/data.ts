export interface IProblem {
  name: string;
  description: string[];
  solution: string[];
}

export const PROBLEMS: IProblem[] = [
  {
    name: 'Ejemplo 1',
    description: [
      '¿Cuál es la probabilidad de obtener un número mayor que 4 al tirar con un dado ordinario cuyas caras están numeradas de 1 a 6?'
    ],
    solution: [
      'Los números mayores que 4 son 5 y 6, 2 opciones de 6 caras.'
    ],
  },
  {
    name: 'Ejemplo 2',
    description: ['De una bolsa que contiene 4 bolas blancas y 5 negras, un hombre saca tres bolas al azar. ¿Cómo se expresarían las apuestas en contra de que las tres bolas sean negras?'],
    solution: ['A'],
  }
];
