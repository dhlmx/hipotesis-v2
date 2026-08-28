import { Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-d3-radial-tree',
  templateUrl: './d3-radial-tree.component.html',
  styleUrls: ['./d3-radial-tree.component.scss']
})
export class D3RadialTreeComponent implements OnChanges, OnInit {
  @Input() data: any;

  hostElement: any;
  svg: any;
  node: any;

  tree = d3.tree;
  cluster: any;
  root: any;

  style = {
    graph: {
      width: 640,
      height: 640,
      radius: 320
    },
    cluster: {
      degrees: 360,
      radius: 180
    },
    node: {
      radius: 8,
      stroke: '#cccc',
      strokeWidth: 2
    },
    path: {
      fill: 'none',
      stroke: '#cccc',
      strokeWidth: 1
    },
    text: {
      fill: '#cccc',
      stroke: '#cccc',
      fontSize: '10px'
    }
  }

  constructor(private elementRef: ElementRef) {
    this.hostElement = elementRef.nativeElement;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data']) {
      this.removeSVG();
      this.setup();
      this.createSVG();
    }
  }

  ngOnInit(): void {
    // TODO throw new Error('Method not implemented.');
  }

  createSVG = (): void => {
    this.svg = d3.select(this.hostElement)
      .append('svg')
      .attr('width', this.style.graph.width)
      .attr('height', this.style.graph.height)
      .append('g')
      .attr('transform', `translate(${this.style.graph.radius}, ${this.style.graph.radius})`);

    this.svg.selectAll('path')
      .data(this.root.links())
      .enter()
      .append('path')
      .attr('d', d3.linkRadial()
        .angle((d: any) => d.x / 180 * Math.PI)
        .radius((d: any) => d.y)
      )
      .style('fill', this.style.path.fill)
      .attr('stroke', this.style.path.stroke)
      .style('stroke-width', this.style.path.strokeWidth);

    this.node = this.svg.selectAll('g')
      .data(this.root.descendants())
      .enter()
      .append('g')
      .attr('transform', (d: any) => `rotate(${d.x -90})translate(${d.y})`);

    this.node.append('circle')
      .attr('r', this.style.node.radius)
      .style('fill', (d: any) => d.data.level)
      .style('stroke', this.style.node.stroke)
      .style('stroke-width', this.style.node.strokeWidth);

    this.node.append('text')
      // .attr('transform', (d: any) => `rotate(${-(d.x - 90)})`)
      .attr('x', (d: any) => d.children ? -(d.data.value - 3) : d.data.value + 10)
      .attr('y', (d: any) => d.children && d.depth !== 0 ? -(d.data.value + 3) : d.data.value)
      .style('text-anchor', (d: any) => d.children ? 'end' : 'start')
      .style('fill', this.style.text.fill)
      .style('stroke', this.style.text.stroke)
      .style('font-size', this.style.text.fontSize)
      .text((d: any) => d.data.name);
  }

  removeSVG = (): void => {
    d3.selectAll('svg').remove();
  }

  setup = (): void => {
    this.cluster = d3.cluster().size([this.style.cluster.degrees, this.style.cluster.radius]);
    this.root = d3.hierarchy(this.data, (d: any) => d.children);
    this.cluster(this.root);
  }
}
