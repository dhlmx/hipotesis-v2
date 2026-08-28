import { EventEmitter } from '@angular/core';
import * as d3 from 'd3';

import { Node } from '../../models/math/node';
import { Link } from '../../models/math/link';

export interface IOptionsXY {
  width: number;
  height: number;
}

const FORCES = {
  LINKS: 1 / 50,
  COLLISION: 1,
  CHARGE: -1
}

export class ForceD3 {

  ticker: EventEmitter<d3.Simulation<Node, Link>> = new EventEmitter();
  simulation: d3.Simulation<any, any> | undefined;
  nodes: Node[] = [];
  links: Link[] = [];

  constructor(nodes: Node[], links: Link[], options: IOptionsXY) {
    this.nodes = nodes;
    this.links = links;

    this.initSimulation(options);
  }

  initLinks() {
    if (!this.simulation) {
      throw new Error('simulation was not initialized yet');
    }

    this.simulation.force('links', d3.forceLink(this.links).strength(FORCES.LINKS));
  }

  initNodes() {
    if (!this.simulation) {
      throw new Error('simulation was not initialized yet');
    }

    this.simulation.nodes(this.nodes);
  }

  initSimulation = (options: IOptionsXY): void => {
    if (!options.height || !options.width) {
      throw new Error('missing options when initializing simulation');
    }

    if (!this.simulation) {
      const ticker = this.ticker;

      // Creating the force simulation and defining the charges
      this.simulation = d3.forceSimulation()
        .force('charge', d3.forceManyBody()
        .strength(FORCES.CHARGE)
      );

      // Connecting the d3 ticker to an angular event emitter
      this.simulation.on('tick', function () {
          ticker.emit(this);
      });

      this.initNodes();
      this.initLinks();
    }

    this.simulation.force('centers', d3.forceCenter(options.width / 2, options.height / 2));
    this.simulation.restart();
  }
}
