import { IChild } from '../../interfaces/math/ichild';
import { Apex } from './apex';
import { Color } from './color';
import { Edge } from './edge';

export class Graph {
  apexes: Apex[] = [];
  colors: Color[]= [];
  edges: Edge[] = [];
  tree: IChild = {} as IChild;

  defineColor = (): void => {
    this.colors.forEach(color => {
      if (color.id === 1) {
        color.name = 'red';
      } else if (color.id === 2) {
        color.name = 'purple';
      } else if (color.id === 3) {
        color.name = 'yellow';
      } else if (color.id === 4) {
        color.name = 'green';
      } else if (color.id === 5) {
        color.name = 'orange';
      }
    });
  }
}
