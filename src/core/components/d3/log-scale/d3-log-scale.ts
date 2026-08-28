import { Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { KeyValue } from '@angular/common';

import * as d3 from 'd3';

@Component({
  selector: 'app-d3-log-scale',
  templateUrl: './d3-log-scale.html',
  styleUrls: ['./d3-log-scale.scss']
})
export class D3LogScale implements OnChanges, OnInit {
  hostElement: any;
  svg: any;
  x: any;
  y: any;

  margin = {
    top: 20,
    right: 20,
    bottom: 40,
    left: 100
  };
  width = 720 - this.margin.left - this.margin.right;
  height = 480 - this.margin.top - this.margin.bottom;
  radius = 3;

  title = '';

  @Input() data: KeyValue<string, number>[] = [];

  constructor(private elementRef: ElementRef) {
    this.hostElement = elementRef.nativeElement;
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data']) {
      this.createSVG();
      this.createAxisX();
      this.createAxisY();
      this.addDots();
    }
  }

  ngOnInit(): void {
    // TODO
  }

  createAxisX = (): void => {
    this.x = d3.scaleLog()
      .domain([1, Math.max(...this.data.map(p => parseInt(p.key)))])
      .range([0, this.width]);

    this.svg.append('g')
      .attr('transform', `translate(0, ${this.height})`)
      .call(d3.axisBottom(this.x))
      .selectAll('text')
      .attr('transform', 'translate(5, 5)') //rotate(-30)
      .style('font-size', '10px')
      .style('text-anchor', 'end');
  }

  createAxisY = (): void => {
    this.y = d3.scaleLog()
      .domain([1, Math.max(...this.data.map(p => p.value))])
      .range([this.height, 0]);

    this.svg.append('g')
      .call(d3.axisLeft(this.y));
  }

  createSVG = (): void => {
    this.svg = d3.select(this.hostElement).append('svg')
      .attr('width', this.width + this.margin.left + this.margin.right)
      .attr('height', this.height + this.margin.top + this.margin.bottom)
      .append("g")
      .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`);
  }

  addDots = (): void => {
    this.svg.append('g')
      .selectAll('bars')
      .data(this.data)
      .join('circle')
      .attr('cx', (d: any) => {
        return this.x(d.key)
      })
      .attr('cy', (d: any) => this.y(d.value))
      .attr('r', this.radius)
      .attr('fill', '#69b3a2')
      .attr('transform', `translate(0, 0)`);
  }

  removeSVG = (): void => {
    d3.select(this.hostElement.nativeElement).select('svg').remove();
  }

}
