import {Component, OnInit} from '@angular/core';
import * as d3 from 'd3';
import * as d3sankey from 'd3-sankey';

@Component({
  selector: 'app-d3v3-example2-dnd',
  templateUrl: './d3v3-example2-dnd.component.html',
  styleUrls: ['./d3v3-example2-dnd.component.css']
})
export class D3v3Example2DndComponent implements OnInit {
  units = 'Widgets';

  margin = {top: 10, right: 10, bottom: 10, left: 10};
  width = 1200 - this.margin.left - this.margin.right;
  height = 740 - this.margin.top - this.margin.bottom;

  formatNumber;    // zero decimal places
  format;
  color;
  svg;
  sankey;
  path;
  nodeMap = {};
  link;
  node;

  ngOnInit() {
    this.formatNumber = d3.format(',.0f');    // zero decimal places
    this.format = d => this.formatNumber(d) + ' ' + this.units;
    this.color = d3.scale.category20();

    // this.firstSolution();
    // this.secondSolution();
    this.thirdSolution();
  }


  /////// doesn't work /////////////////////////////////////////////////////////////////////
  // firstSolution() {
  //   // append the svg canvas to the page
  //   this.svg = d3.select('#chart').append('svg')
  //     .attr('width', this.width + this.margin.left + this.margin.right)
  //     .attr('height', this.height + this.margin.top + this.margin.bottom)
  //     .append('g')
  //     .attr('transform',
  //       'translate(' + this.margin.left + ',' + this.margin.top + ')');
  //
  //   // Set the sankey diagram properties
  //   this.sankey = d3sankey.sankey()
  //     .nodeWidth(36)
  //     .nodePadding(10)
  //     .size([this.width, this.height]);
  //
  //   this.path = this.sankey.link();
  //
  //
  //   // load the data
  //   d3.json('sankeygreenhouse.json', (error, graph: any) => {
  //     graph.nodes.forEach(x => this.nodeMap[x.name] = x);
  //     graph.links = graph.links.map(x => {
  //       return {
  //         source: this.nodeMap[x.source],
  //         target: this.nodeMap[x.target],
  //         value: x.value
  //       };
  //     });
  //
  //     this.sankey
  //       .nodes(graph.nodes)
  //       .links(graph.links)
  //       .layout(32);
  //
  //     // add in the links
  //     this.link = this.svg.append('g').selectAll('.link')
  //       .data(graph.links)
  //       .enter().append('path')
  //       .attr('class', 'link')
  //       .attr('d', this.path)
  //       .style('stroke-width', d => Math.max(1, d.dy))
  //       .sort((a, b) => b.dy - a.dy);
  //
  //     // add the link titles
  //     this.link.append('title')
  //       .text(d => {
  //         return d.source.name + ' → ' +
  //           d.target.name + '\n' + this.format(d.value); });
  //
  //     // add in the nodes
  //     this.node = this.svg.append('g').selectAll('.node')
  //       .data(graph.nodes)
  //       .enter().append('g')
  //       .attr('class', 'node')
  //       .attr('transform', d => 'translate(' + d.x + ',' + d.y + ')')
  //       .call(d3.behavior.drag()
  //         .origin(function(d) { return d; })
  //         .on('dragstart', function() {
  //           this.parentNode.appendChild(this); })
  //         .on('drag', dragmove));
  //
  //     // add the rectangles for the nodes
  //     this.node.append('rect')
  //       .attr('height', function(d) { return d.dy; })
  //       .attr('width', this.sankey.nodeWidth())
  //       .style('fill', d => d.color = this.color(d.name.replace(/ .*/, '')))
  //       .style('stroke', d => d3.rgb(d.color).darker(2))
  //       .append('title')
  //       .text(d => d.name + '\n' + this.format(d.value));
  //
  //     // add in the title for the nodes
  //     this.node.append('text')
  //       .attr('x', -6)
  //       .attr('y', d => d.dy / 2)
  //       .attr('dy', '.35em')
  //       .attr('text-anchor', 'end')
  //       .attr('transform', null)
  //       .text(d => d.name)
  //       .filter(d => d.x < this.width / 2)
  //       .attr('x', 6 + this.sankey.nodeWidth())
  //       .attr('text-anchor', 'start');
  //
  //     // the function for moving the nodes
  //     function dragmove(d: any) {
  //       d3.select(this).attr('transform',
  //         'translate(' + (
  //           d.x = Math.max(0, Math.min(this.width - d.dx, d3.event.x))
  //         ) + ',' + (
  //           d.y = Math.max(0, Math.min(this.height - d.dy, d3.event.y))
  //         ) + ')');
  //       this.sankey.relayout();
  //       this.link.attr('d', this.path);
  //     }
  //   });
  // }

  /////// doesn't work /////////////////////////////////////////////////////////////////////
  // secondSolution() {
  //
  //   var svg = d3.select('#sankey'),
  //     width = +svg.attr('width'),
  //     height = +svg.attr('height');
  //
  //   var formatNumber = d3.format(',.0f'),
  //     format = function (d: any) { return formatNumber(d) + ' TWh'; },
  //     color = d3.scaleOrdinal(d3.schemeCategory10);
  //
  //   var sankey = d3sankey.sankey()
  //     .nodeWidth(15)
  //     .nodePadding(10)
  //     .extent([[1, 1], [width - 1, height - 6]]);
  //
  //   var link = svg.append('g')
  //     .attr('class', 'links')
  //     .attr('fill', 'none')
  //     .attr('stroke', '#000')
  //     .attr('stroke-opacity', 0.2)
  //     .selectAll('path');
  //
  //   var node = svg.append('g')
  //     .attr('class', 'nodes')
  //     .attr('font-family', 'sans-serif')
  //     .attr('font-size', 10)
  //     .selectAll('g');
  //
  //   //d3.json('./energy.json', function (error, energy: any) {
  //   //if (error) throw error;
  //   const energy = {
  //     nodes: [{
  //       nodeId: 0,
  //       name: 'node0'
  //     }, {
  //       nodeId: 1,
  //       name: 'node1'
  //     }, {
  //       nodeId: 2,
  //       name: 'node2'
  //     }, {
  //       nodeId: 3,
  //       name: 'node3'
  //     }, {
  //       nodeId: 4,
  //       name: 'node4'
  //     }],
  //     links: [{
  //       source: 0,
  //       target: 2,
  //       value: 2,
  //       uom: 'Widget(s)'
  //     }, {
  //       source: 1,
  //       target: 2,
  //       value: 2,
  //       uom: 'Widget(s)'
  //     }, {
  //       source: 1,
  //       target: 3,
  //       value: 2,
  //       uom: 'Widget(s)'
  //     }, {
  //       source: 0,
  //       target: 4,
  //       value: 2,
  //       uom: 'Widget(s)'
  //     }, {
  //       source: 2,
  //       target: 3,
  //       value: 2,
  //       uom: 'Widget(s)'
  //     }, {
  //       source: 2,
  //       target: 4,
  //       value: 2,
  //       uom: 'Widget(s)'
  //     }, {
  //       source: 3,
  //       target: 4,
  //       value: 4,
  //       uom: 'Widget(s)'
  //     }]
  //   };
  //
  //
  //   sankey(energy);
  //
  //   link = link
  //     .data(energy.links)
  //     .enter().append('path')
  //     .attr('d', d3Sankey.sankeyLinkHorizontal())
  //     .attr('stroke-width', function (d: any) { return Math.max(1, d.width); });
  //
  //   link.append('title')
  //     .text(function (d: any) { return d.source.name + ' → ' + d.target.name + '\n' + format(d.value); });
  //
  //   node = node
  //     .data(energy.nodes)
  //     .enter().append('g');
  //
  //   node.append('rect')
  //     .attr('x', function (d: any) { return d.x0; })
  //     .attr('y', function (d: any) { return d.y0; })
  //     .attr('height', function (d: any) { return d.y1 - d.y0; })
  //     .attr('width', function (d: any) { return d.x1 - d.x0; })
  //     .attr('fill', function (d: any) { return color(d.name.replace(/ .*/, '')); })
  //     .attr('stroke', '#000');
  //
  //   node.append('text')
  //     .attr('x', function (d: any) { return d.x0 - 6; })
  //     .attr('y', function (d: any) { return (d.y1 + d.y0) / 2; })
  //     .attr('dy', '0.35em')
  //     .attr('text-anchor', 'end')
  //     .text(function (d: any) { return d.name; })
  //     .filter(function (d: any) { return d.x0 < width / 2; })
  //     .attr('x', function (d: any) { return d.x1 + 6; })
  //     .attr('text-anchor', 'start');
  //
  //   node.append('title')
  //     .text(function (d: any) { return d.name + '\n' + format(d.value); });
  //   // });
  // }


  /////// TO FINISH /////////////////////////////////////////////////////////////////////
  thirdSolution() {
    // from  http://bl.ocks.org/d3noob/5028304

    // append the svg canvas to the page
    const svg = d3.select('#chart').append('svg')
      .attr('width', this.width + this.margin.left + this.margin.right)
      .attr('height', this.height + this.margin.top + this.margin.bottom)
      .append('g')
      .attr('transform',
        'translate(' + this.margin.left + ',' + this.margin.top + ')');

    // Set the sankey diagram properties
    this.sankey = d3sankey.sankey()
      .nodeWidth(36)
      .nodePadding(10)
      .size([this.width, this.height]);

    this.path = this.sankey.link;

    // load the data
    d3.json('../assets/json/example2.json', (error, graph) => {

      const nodeMap = {};
      graph.nodes.forEach(function(x) { nodeMap[x.name] = x; });
      graph.links = graph.links.map((x) => {
        return {
          source: nodeMap[x.source],
          target: nodeMap[x.target],
          value: x.value
        };
      });

      console.dir(this.sankey);
      this.sankey
        .nodes(graph.nodes)
        .links(graph.links)
        .layout(32);

      // add in the links
      this.link = svg.append('g').selectAll('.link')
        .data(graph.links)
        .enter().append('path')
        .attr('class', 'link')
        .attr('d', this.path)
        .style('stroke-width', (d: any) => Math.max(1, d.dy))
        .sort((a: any, b: any) => b.dy - a.dy);

      // add the link titles
      this.link.append('title')
        .text(d => {
          return d.source.name + ' → ' +
            d.target.name + '\n' + this.format(d.value); });

      // add in the nodes
      const node = svg.append('g').selectAll('.node')
        .data(graph.nodes)
        .enter().append('g')
        .attr('class', 'node')
        .attr('transform', (d: any) => 'translate(' + d.x + ',' + d.y + ')')
        .call(d3.behavior.drag()
          .origin(function(d: any) { return d; })
          .on('dragstart', function() {
            this.parentNode.appendChild(this); })
          .on('drag', dragmove));

      // add the rectangles for the nodes
      node.append('rect')
        .attr('height', (d: any) => d.dy)
        .attr('width', this.sankey.nodeWidth())
        .style('fill', (d: any) => d.color = this.color(d.name.replace(/ .*/, '')))
        .style('stroke', (d: any) => d3.rgb(d.color).darker(2))
        .append('title')
        .text(d => d.name + '\n' + this.format(d.value));

      // add in the title for the nodes
      node.append('text')
        .attr('x', -6)
        .attr('y', (d: any) => d.dy / 2)
        .attr('dy', '.35em')
        .attr('text-anchor', 'end')
        .attr('transform', null)
        .text((d: any) => d.name)
        .filter((d: any) => d.x < this.width / 2)
        .attr('x', 6 + this.sankey.nodeWidth())
        .attr('text-anchor', 'start');

      // the function for moving the nodes
      function dragmove(d) {
        d3.select(this).attr('transform',
          'translate(' + (
            d.x = Math.max(0, Math.min(this.width - d.dx, (<any>d3.event).x))
          ) + ',' + (
            d.y = Math.max(0, Math.min(this.height - d.dy, (<any>d3.event).y))
          ) + ')');
        this.sankey.relayout();
        this.link.attr('d', this.path);
      }
    });

  }


}
