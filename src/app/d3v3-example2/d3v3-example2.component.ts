import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
import * as d3sankey from 'd3-sankey';


@Component({
  selector: 'app-d3v3-example2',
  templateUrl: './d3v3-example2.component.html',
  styleUrls: ['./d3v3-example2.component.css']
})
export class D3v3Example2Component implements OnInit {
  units = 'Orders';
  margin = {top: 10, right: 10, bottom: 10, left: 10};
  width;
  height;
  formatNumber;
  format;
  color;
  svg;
  sankey;
  path;


  ngOnInit() {
    this.width = 1200 - this.margin.left - this.margin.right;
    this.height = 680 - this.margin.top - this.margin.bottom;
    this.formatNumber = d3.format(',.0f');    // zero decimal places
    this.format = d => this.formatNumber(d) + ' ' + this.units;
    this.color = d3.scale.category20();

    // append the svg canvas to the page
    this.svg = d3.select('#chart').append('svg')
      .attr('width', this.width + this.margin.left + this.margin.right)
      .attr('height', this.height + this.margin.top + this.margin.bottom)
      .attr('viewBox', '0 0 1600 680') // needs investigation
      .attr('preserveAspectRatio', 'xMinYMin meet') // needs investigation
      .append('g')
      .attr('transform',
        'translate(' + this.margin.left + ',' + this.margin.top + ')');

    // Set the sankey diagram properties
    // this.sankey = d3.sankey()
    //                 .nodeWidth(36)
    //                 .nodePadding(40)
    //                 .size([this.width, this.height]);
    // this.path = this.sankey.link();


    // load the data
//     d3.json('example2.json', (error, graph) => {
//       const nodeMap = {};
//       graph.nodes.forEach(x => nodeMap[x.name] = x);
//       graph.links = graph.links.map(x => {
//         return {
//           source: nodeMap[x.source],
//           target: nodeMap[x.target],
//           value: x.value
//         };
//       });
//       const nodeColors = {
//         'Advertiser1': '#FF0000',
//         'Agency1': '#0000FF',
//         'Agency2': '#0000FF',
//         'Agency3': '#0000FF',
//         'MediaOwner1': '#00FF00',
//         'MediaOwner2': '#00FF00',
//         'MediaOwner3': '#00FF00',
//         'MediaOwner4': '#00FF00',
//       };
//       this.sankey
//         .nodes(graph.nodes)
//         .links(graph.links)
//         .layout(32);
//
//       // add in the links
//       const link = this.svg.append('g').selectAll('.link')
//         .data(graph.links)
//         .enter().append('path')
//         .attr('class', 'link')
//         .attr('d', this.path)
//         .style('stroke-width', d => Math.max(1, d.dy))
//         .sort((a, b) => b.dy - a.dy);
//
//       // add the link titles
//       link.append('title')
//         .text(d => {
//           return d.source.name + ' → ' +
//             d.target.name + '\n' + this.format(d.value); });
//
//       // add in the nodes
//       const node = this.svg.append('g').selectAll('.node')
//         .data(graph.nodes)
//         .enter().append('g')
//         .attr('class', 'node')
//
//         .attr('transform', d => 'translate(' + d.x + ',' + d.y + ')')
//         .call(d3.behavior.drag()
//           .origin(function(d) { return d; } )
//           .on('dragstart', () => this.parentNode.appendChild(this))
//           .on('drag', this.dragmove));
// // add the rectangles for the nodes
//       node.append('rect')
//         .attr('height', d => d.dy)
//         .attr('width', this.sankey.nodeWidth())
//         .style('fill', d => d.color = this.color(d.name.replace(/ .*/, '')))
//         .style('stroke', d => d3.rgb(d.color).darker(2))
//         .append('title')
//         .text(d => d.name + '\n' + this.format(d.value));
//
//       // add in the title for the nodes
//       node.append('text')
//         .attr('x', -6)
//         .attr('y', d => d.dy / 2 )
//         .attr('dy', '.35em')
//         .attr('text-anchor', 'end')
//         .attr('transform', null)
//         .text(d => d.name)
//         .filter(d => d.x < this.width / 2)
//         .attr('x', 6 + this.sankey.nodeWidth())
//         .attr('text-anchor', 'start');
//
//     });
  }

  // the function for moving the nodes
  // dragmove(d) {
  //   d3.select(this).attr('transform',
  //     'translate(' + d.x + ',' + (
  //       d.y = Math.max(0, Math.min(this.height - d.dy, d3.event.y))
  //     ) + ')');
  //   this.sankey.relayout();
  //   link.attr('d', this.path);
  // }


}
