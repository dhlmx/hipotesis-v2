import { Component, ElementRef, Input, OnChanges, OnInit, Renderer2, SimpleChanges } from '@angular/core';
import * as d3 from 'd3';

// Interfaces
import { ITecnology } from '../../../interfaces/itecnology';
import { IChild } from '../../../interfaces/math/ichild';

@Component({
  selector: 'app-d3-tidy-tree',
  templateUrl: './d3-tidy-tree.component.html',
  styleUrls: ['./d3-tidy-tree.component.scss']
})
export class D3TidyTreeComponent implements OnChanges, OnInit {

  @Input() data: any;

  hostElement: any;
  svg: any;
  g: any;

  gLink: any;
  gNode: any;

  node: any;
  nodeEnter: any;

  margin = { top: 10, right: 120, bottom: 10, left: 40 };
  width = 960; // d3.width || 960
  dx = 10;
  dy = this.width / 6;

  root: any;
  diagonal: any;

  x0 = 0;
  x1 = 0;

  // duration: any;
  // transition: any;

  // nodes: any;
  // links: any;

  // left: any;
  // right: any;


  hierarchy: any;
  treeMap: any;
  descendants: any;
  l: any;
  path: any;
  id: any;
  parentId: any;
  children: any;
  tree: any;
  sort: any;
  label: any;
  title: any;
  linkTarget = '_blank';
  height = 0;
  r = 3;
  padding = 1;
  fill = '#999';
  fillOpacity: any;
  stroke = '#555';
  strokeWidth = 1.5;
  strokeOpacity = 0.4;
  strokeLinejoin: any;
  strokeLinecap: any;
  halo = '#fff';
  haloWidth = 3;
  curve = d3.curveBumpX;

  constructor(private elementRef: ElementRef, private render: Renderer2) {
    this.hostElement = elementRef.nativeElement;
    this.render.addClass(this.hostElement, 'node-text');
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data']) {
      this.root = d3.hierarchy(this.data);
      this.tree = d3.tree().nodeSize([this.dx, this.dy]);
      this.diagonal = d3.linkHorizontal()
        .x((d: any) => d.y)
        .y((d: any) => d.x);

      this.root.x0 = this.dy / 2;
      this.root.y0 = 0;

      this.root.descendants().forEach((d: any, i: any) => {
        d.id = i;
        d._children = d.children;
      });

      this.tree(this.root);

      this.svg = d3.select(this.hostElement).append('svg')
        .attr("viewBox", [-this.margin.left, -this.margin.top, this.width, this.dx])
        .style("font", "10px sans-serif")
        .style("user-select", "none");

      this.gLink = this.svg
        .append("g")
        .attr("fill", "none")
        .attr("stroke", "#555")
        .attr("stroke-opacity", 0.4)
        .attr("stroke-width", 1.5);

      this.gNode = this.svg
        .append("g")
        .attr("cursor", "pointer")
        .attr("pointer-events", "all");

      this.update(this.root);
    }
  }

  ngOnInit(): void {
  }

  update = (source: any): void => {
    // this.duration = d3.event && d3.scaleDivergingSqrt.altkey ? 2500 : 250;
    const duration = 250,
        nodes = this.root.descendants().reverse(),
        links = this.root.links();

    let left = this.root,
        right = this.root,
        height = 0,
        transition: any,
        node: any,
        nodeEnter: any,
        link: any,
        linkEnter: any;

    this.root.eachBefore((node: any) => {
      if (node.x < left.x) {
        left = node;
      }
      if (node.x > right.x) {
        right = node;
      }
    });

    height = right.x - left.x + this.margin.top + this.margin.bottom;

    transition = this.svg
      .transition()
      .duration(duration)
      .attr("viewBox", [-this.margin.left, left.x - this.margin.top, this.width, height])
      .tween(
        "resize",
        window.ResizeObserver ? null : () => () => this.svg.dispatch("toggle")
      );

    node = this.gNode.selectAll('g').data(nodes, (d: any) => d.id);

    nodeEnter = node
      .enter()
      .append("g")
      .attr("transform", (d: any) => `translate(${source.y0},${source.x0})`)
      .attr("fill-opacity", 0)
      .attr("stroke-opacity", 0)
      .on("click", (event: any, d: any) => {
        d.children = d.children ? null : d._children;
        this.update(d);
      });

    nodeEnter
      .append("circle")
      .attr("r", 2.5)
      .attr("fill", (d: any) => (d._children ? "#555" : "#999"))
      .attr("stroke-width", 10);

    nodeEnter
      .append("text")
      .attr("dy", "0.31em")
      .attr("x", (d: any) => (d._children ? -6 : 6))
      .attr("text-anchor", (d: any) => (d._children ? "end" : "start"))
      .text((d: any) => d.data.name)
      .clone(true)
      .lower()
      .attr("stroke-linejoin", "round")
      .attr("stroke-width", 3)
      .attr("stroke", "white");

    node
      .merge(nodeEnter)
      .transition(transition)
      .attr("transform", (d: any) => `translate(${d.y},${d.x})`)
      .attr("fill-opacity", 1)
      .attr("stroke-opacity", 1);

    // Transition exiting nodes to the parent's new position.
    node
      .exit()
      .transition(transition)
      .remove()
      .attr("transform", (d: any) => `translate(${source.y},${source.x})`)
      .attr("fill-opacity", 0)
      .attr("stroke-opacity", 0);

    link = this.gLink.selectAll('path').data(links, (d: any) => d.target.id);

    linkEnter = link
      .enter()
      .append("path")
      .attr("d", (d: any) => {
        const o = { x: source.x0, y: source.y0 };
        return this.diagonal({ source: o, target: o });
      });

    link.merge(linkEnter).transition(transition).attr("d", this.diagonal);

    // Transition exiting nodes to the parent's new position.
    link
      .exit()
      .transition(transition)
      .remove()
      .attr("d", (d: any) => {
        const o = { x: source.x, y: source.data.y };
        return this.diagonal({ source: o, target: o });
      });

    // Stash the old positions for transition.
    this.root.eachBefore((d: any) => {
      d.x0 = d.x;
      d.y0 = d.y;
    });
  }
}
/*

  centerTree = (): void => {
    this.x0 = 10;
    this.x1 = -this.x0;

    this.root.forEach((d: any) => {
      if (this.dx > this.x1) {
        this.x1 = this.dx;
      }
      if (this.dx < this.x0) {
        this.x0 = this.dx;
      }
    });
  }

  createSVG = (): void => {
    this.svg = d3.select(this.hostElement).append('svg')
      .attr("viewBox", [-this.dy * this.padding / 2, this.x0 - this.dx, this.width, this.height])
      .attr("width", this.width)
      .attr("height", this.height)
      .attr("style", "max-width: 100%; height: auto; height: intrinsic;")
      .attr("font-family", "sans-serif")
      .attr("font-size", 10);

    this.svg.append("g")
      .attr("fill", "none")
      .attr("stroke", this.stroke)
      .attr("stroke-opacity", this.strokeOpacity)
      .attr("stroke-linecap", this.strokeLinecap)
      .attr("stroke-linejoin", this.strokeLinejoin)
      .attr("stroke-width", this.strokeWidth)
      .selectAll("path")
      .data(this.root.links())
      .join("path")
      .attr("d", d3.link(this.curve)
        .x((d: any) => d.y)
        .y((d: any) => d.x));

    this.node = this.svg.append("g")
      .selectAll("a")
      .data(this.root.descendants())
      .join("a")
      .attr("xlink:href", this.link == null ? null : (d: any) => this.link(d.data, d))
      .attr("target", this.link == null ? null : this.linkTarget)
      .attr("transform", (d: any) => `translate(${d.y},${d.x})`);

    this.node.append("circle")
      .attr("fill", (d: any) => d.children ? this.stroke : this.fill)
      .attr("r", this.r);

    if (this.title !== null) {
      this.node.append('title').text((d: any) => this.title(d.data, d));
    }

    if (this.l) {
      this.node.append("text")
        .attr("dy", "0.32em")
        .attr("x", (d: any) => d.children ? -6 : 6)
        .attr("text-anchor", (d: any) => d.children ? "end" : "start")
        .attr("paint-order", "stroke")
        .attr("stroke", this.halo)
        .attr("stroke-width", this.haloWidth)
        .text((d: any, i: any) => this.l[i]);
    }
  }

  setupIds = (): void => {
    this.id = Array.isArray(this.data) ? (d: any) => d.id : null;
    this.parentId = Array.isArray(this.data) ? (d: any) => d.parentId : null;
  }

  setupLabelsAndTitles = (): void => {
    this.descendants = this.root.descendants();
    this.l = this.label === null ? null : this.descendants.map((d: any) => this.label(d.data, d));
  }

  setupHeight = (): void => {
    if (this.height === undefined) {
      this.height = this.x1 - this.x0 + (this.dx * 2);
    }
  }

  setupLayout = (): void => {
    this.dx = Infinity;
    this.dy = this.width / (this.root,this.height + this.padding);
    this.tree().nodeSize([this.dx, this.dy])(this.root);
  }

  setupRoot = (): void => {
    // if (this.path !== null) {
    //   this.root = d3.stratify().path(this.path)(this.data);
    // } else if (this.id !== null || this.parentId !== null) {
    //   this.root = d3.stratify().id(this.id).parentId(this.parentId)(this.data);
    // } else {
    //   this.root = d3.hierarchy(this.data, this.children);
    // }
    this.root = d3.hierarchy(this.data);
  }

  sortNodes = (): void => {
    if (this.sort !== null) {
      this.root.sort(this.sort);
    }



*/


  // OLD CODE
  // setupTree = (): void => {
  //   this.treeMap = d3.tree().size([this.height, this.width]);
  //   this.nodes = d3.hierarchy(this.treeData, d => d.children);
  //   this.nodes = this.treeMap(this.nodes);

  //   this.svg = d3.select(this.hostElement).append('svg')
  //     .attr('width', this.width + this.margin.left + this.margin.right)
  //     .attr('height', this.height + this.margin.top + this.margin.bottom)
  //     .attr('class', 'node-text');

  //   this.g = this.svg.append('g')
  //     .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`);

  //   this.link = this.g.selectAll('.link')
  //     .data(this.nodes.descendants().slice(1))
  //     .enter()
  //     .append('path')
  //     .attr('class', 'link')
  //     .style('stroke', (d: any) => d.data.level)
  //     .attr('d', (d: any) => {
  //       return 'M' + d.y + ',' + d.x
  //         + 'C' + (d.y + d.parent.y) / 2 + ',' + d.x
  //         + ' ' + (d.y + d.parent.y) / 2 + ',' + d.parent.x
  //         + ' ' + d.parent.y + ',' + d.parent.x;
  //     });

  //   this.node = this.g.selectAll('.node')
  //     .data(this.nodes.descendants())
  //     .enter()
  //     .append('g')
  //     .attr('class', (d: any) => 'node' + d.children ? ' node--internal' : ' node--leaf')
  //     .attr('transform', (d: any) => `translate(${d.y}, ${d.x})`);

  //   this.node.append('circle')
  //     .attr('r', (d: any) => d.data.value)
  //     .style('stroke', (d: any) => d.data.type)
  //     .style('fill', (d: any) => d.data.level);

  //   this.node.append('text')
  //     .attr('dy', '.35em')
  //     .attr('x', (d: any) => d.children ? (d.data.value + 5) * -1 : d.data.value + 5)
  //     .attr('y', (d: any) => d.children && d.depth !== 0 ? -(d.data.value + 5) : d)
  //     .attr('class', 'node-text')
  //     .style('text-anchor', (d: any) => d.children ? 'end' : 'start')
  //     .text((d: any) => d.data.name);


  // }
