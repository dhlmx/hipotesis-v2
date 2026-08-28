import { Component, ElementRef, Input, OnChanges, OnInit, Renderer2, SimpleChanges } from '@angular/core';
import * as d3 from 'd3';
import { ITecnology } from '../../../interfaces/itecnology';
import { IChild } from '../../../interfaces/math/ichild';

@Component({
  selector: 'app-d3-tree',
  templateUrl: './d3-tree.component.html',
  styleUrls: ['./d3-tree.component.scss']
})
export class D3TreeComponent {
  hostElement: any;
  svg: any;
  g: any;
  treeMap: any;
  hierarchy: any;
  nodes: any;
  node: any;
  link: any;

  margin = { top: 20, right: 90, bottom: 30, left: 90 };
  width  = 660 - this.margin.left - this.margin.right;
  height = 500 - this.margin.top - this.margin.bottom;
  padding = 0.2;

  @Input() treeData: IChild = {} as IChild;

  constructor(private elementRef: ElementRef, private render: Renderer2) {
    this.hostElement = elementRef.nativeElement;
    this.render.addClass(this.hostElement, 'node-text');
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['treeData'] && changes['treeData'].currentValue) {
      this.setupTree();
    }
  }

  ngOnInit(): void {
  }

  setupTree = (): void => {
    this.treeMap = d3.tree().size([this.height, this.width]);
    this.nodes = d3.hierarchy(this.treeData, (d: any) => d.children);
    this.nodes = this.treeMap(this.nodes);

    this.svg = d3.select(this.hostElement).append('svg')
      .attr('width', this.width + this.margin.left + this.margin.right)
      .attr('height', this.height + this.margin.top + this.margin.bottom)
      .attr('class', 'node-text');

    this.g = this.svg.append('g')
      .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`);

    this.link = this.g.selectAll('.link')
      .data(this.nodes.descendants().slice(1))
      .enter()
      .append('path')
      .attr('class', 'link')
      .style('stroke', (d: any) => d.data.level)
      .attr('d', (d: any) => {
        return 'M' + d.y + ',' + d.x
          + 'C' + (d.y + d.parent.y) / 2 + ',' + d.x
          + ' ' + (d.y + d.parent.y) / 2 + ',' + d.parent.x
          + ' ' + d.parent.y + ',' + d.parent.x;
      });

    this.node = this.g.selectAll('.node')
      .data(this.nodes.descendants())
      .enter()
      .append('g')
      .attr('class', (d: any) => 'node' + d.children ? ' node--internal' : ' node--leaf')
      .attr('transform', (d: any) => `translate(${d.y}, ${d.x})`);

    this.node.append('circle')
      .attr('r', (d: any) => d.data.value)
      .style('stroke', (d: any) => d.data.type)
      .style('fill', (d: any) => d.data.level);

    this.node.append('text')
      .attr('dy', '.35em')
      .attr('x', (d: any) => d.children ? (d.data.value + 5) * -1 : d.data.value + 5)
      .attr('y', (d: any) => d.children && d.depth !== 0 ? -(d.data.value + 5) : d)
      // .attr('class', 'node-text')
      .style('text-anchor', (d: any) => d.children ? 'end' : 'start')
      .style('fill', '#CCC')
      .style('font-size', '11px')
      .text((d: any) => d.data.name);


  }

  // createSVG = (): void => {
  //   this.svg = d3.select(this.hostElement)
  //     .append('svg')
  //     .attr('width', this.width + this.margin.left + this.margin.right)
  //     .attr('height', this.height + this.margin.top + this.margin.bottom)
  //     .append('g')
  //     .attr('transform', `translate(${this.margin}, ${this.margin})`);
  // }
}

/*
// this.svg = d3.select(this.hostElement)
//   .append('svg')
//   .attr('width', '100%')
//   .attr('height', '100%')
//   .append('g')
//   .attr('transform', `translate(${this.margin}, ${this.margin})`);



*/
