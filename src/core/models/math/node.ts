export class Node implements d3.SimulationNodeDatum {

  id: string;
  index?: number;
  x?: number;
  y?: number;
  vx?: number;
  vy?: number;
  fx?: number | null;
  fy?: number | null;

  constructor(id: string) {
    this.id = id;
  }
}
