import { Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import * as d3 from 'd3';

// Interfaces
import { ITecnology } from '../../../interfaces/itecnology';

@Component({
  selector: 'app-d3-bars',
  templateUrl: './d3-bars.component.html',
  styleUrls: ['./d3-bars.component.scss']
})
export class D3BarsComponent implements OnInit, OnChanges {

  hostElement: any;
  svg: any;
  x: any;
  y: any;

  width = 640;
  height = 400;
  margin = 40;
  padding = 0.2;

  @Input() frameworks: ITecnology[] = [];

  constructor(private elementRef: ElementRef) {
    this.hostElement = elementRef.nativeElement;
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['frameworks'] && changes['frameworks'].currentValue) {
      this.createSVG();
      this.createAxisX();
      this.createAxisY();
      this.drawBars();
    }
  }

  ngOnInit(): void {
  }

  createAxisX = (): void => {
    this.x = d3.scaleBand()
      .range([0, this.width])
      .domain(this.frameworks.map(d => d.framework)).padding(this.padding);

    // Draw the X-axis on the DOM
    this.svg.append('g')
      .attr('transform', 'translate(0,' + this.height + ')')
      .call(d3.axisBottom(this.x))
      .selectAll('text')
      .attr('transform', 'translate(-10,0)rotate(-60)')
      .style('text-anchor', 'end');
  }

  createAxisY = (): void => {
    this.y = d3.scaleLinear()
      .range([this.height, 0])
      .domain([0, 200000]);

    this.svg.append('g').call(d3.axisLeft(this.y));
  }

  createSVG = (): void => {
    this.svg = d3.select(this.hostElement)
      .append('svg')
      .attr('width', this.width + (this.margin * 2))
      .attr('height', this.height + (this.margin * 2))
      .append("g")
      .attr('transform', `translate(${this.margin}, ${this.margin})`);
  }

  drawBars = (): void => {
    this.svg.selectAll('bars')
      .data(this.frameworks)
      .enter()
      .append('rect')
      .attr('x', (d: ITecnology) => this.x(d.framework))
      .attr('y', (d: ITecnology) => this.y(d.stars))
      .attr('width', this.x.bandwidth())
      .attr('height', (d: ITecnology) => this.height - this.y(d.stars))
      .attr('fill', '#d04a35');
  }

  removeSVG = (): void => {
    d3.select(this.hostElement.nativeElement).select('svg').remove();
  }
}
