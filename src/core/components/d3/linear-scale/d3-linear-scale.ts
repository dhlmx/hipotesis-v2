import { Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { KeyValue } from '@angular/common';
import * as d3 from 'd3';
import { IPolynomialRegression } from '../../../interfaces/ipolynomial-regression';

@Component({
  selector: 'app-d3-linear-scale',
  templateUrl: './d3-linear-scale.html',
  styleUrls: ['./d3-linear-scale.scss']
})
export class D3LinearScale implements OnChanges, OnInit {
  hostElement: any;
  svg: any;
  x: any;
  y: any;

  readonly margin = {
    top: 20,
    right: 20,
    bottom: 40,
    left: 100
  };
  width = 720 - this.margin.left - this.margin.right;
  height = 480 - this.margin.top - this.margin.bottom;
  radius = 3;

  title = 'Algorithm: Polynomial Regression';

  @Input() data: IPolynomialRegression = {
    x: [],
    y: [],
    ys: []
  };
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
    this.x = d3.scaleLinear()
      .domain([Math.min(...this.data.x), Math.max(...this.data.y)])
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
    this.y = d3.scaleLinear()
      .domain([-1 * Math.max(...this.data.y), Math.max(...this.data.y)])
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
    const keyValues: { key: number; value: number }[] = this.data.x.map((x, i) => ({ key: x, value: this.data.y[i] }));

    this.svg.append('g')
      .selectAll('bars')
      .data(keyValues)
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
