import { Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import * as d3 from 'd3';

// Interfaces
import { ITecnology } from '../../../interfaces/itecnology';


@Component({
  selector: 'app-d3-pie',
  templateUrl: './d3-pie.component.html',
  styleUrls: ['./d3-pie.component.scss']
})
export class D3PieComponent {

  hostElement: any;
  svg: any;
  pie: any;
  labelLocation: any;
  colors: any;

  width = 750;
  height = 600;
  margin = 40;
  radius = Math.min(this.width, this.height) / 2 - this.margin;

  @Input() frameworks: ITecnology[] = [];

  constructor(private elementRef: ElementRef) {
    this.hostElement = elementRef.nativeElement;
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['frameworks'] && changes['frameworks'].currentValue) {
      this.createSVG();
      this.createColors();
      this.drawPie();
    }
  }

  ngOnInit(): void {
  }

  createColors = (): void => {
    this.colors = d3.scaleOrdinal()
      .domain(this.frameworks.map(d => d.stars.toString()))
      .range(["#c7d3ec", "#a5b8db", "#879cc4", "#677795", "#5a6782"]);
  }

  createSVG = (): void => {
    this.svg = d3.select(this.hostElement)
      .append('svg')
      .attr('width', this.width)
      .attr('height', this.height)
      .append('g')
      .attr('transform', `translate(${this.width / 2}, ${this.height / 2})`);
  }

  drawPie = (): void => {
    this.pie = d3.pie<ITecnology>().value(d => d.stars);

    this.svg.selectAll('pieces')
      .data(this.pie(this.frameworks))
      .enter()
      .append('path')
      .attr('d', d3.arc()
        .innerRadius(0)
        .outerRadius(this.radius)
      )
      .attr('fill', (d: ITecnology, i: ITecnology) => (this.colors(i)))
      .attr('stroke', '#121926')
      .style('stroke-width', '1px');

    this.labelLocation = d3.arc()
      .innerRadius(100)
      .outerRadius(this.radius);

    this.svg.selectAll('pieces')
      .data(this.pie(this.frameworks))
      .enter()
      .append('text')
      .text((d: any)=> d.data.framework)
      .attr('transform', (d: ITecnology) => `translate(${this.labelLocation.centroid(d)})`)
      .style('text-anchor', 'middle')
      .style('font-size', 10);
  }
}
