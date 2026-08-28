import { Node } from './node';

type NodeType = Node | string | number;

export class Link implements d3.SimulationLinkDatum<Node> {

  index?: number;
  source: NodeType;
  target: NodeType;

  constructor(source: NodeType, target: NodeType) {
    this.source = source;
    this.target = target;
  }
}
