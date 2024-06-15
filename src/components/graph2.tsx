'use client';
import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

interface Node extends d3.SimulationNodeDatum {
  id: string;
}

interface Edge {
  from: string;
  to: string;
  weight: number;
}

interface GraphData {
  nodes: Node[];
  edges: Edge[];
}

interface GraphProps {
  data: GraphData;
}

export const Graph2: React.FC<GraphProps> = ({ data }) => {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3
      .select(svgRef.current)
      .attr('width', 800)
      .attr('height', 600)
      .style('border', '1px solid white');

    const simulation = d3.forceSimulation<Node>(data.nodes);

    // Set initial positions for nodes
    data.nodes.forEach(node => {
      node.x = Math.random() * (800 - 50); // Random x within SVG width
      node.y = Math.random() * (600 - 50); // Random y within SVG height
    });

    // Append circles for nodes
    const nodes = svg
      .selectAll('circle')
      .data(data.nodes, (d: any) => d.id) // Use node id as key
      .enter()
      .append('circle')
      .attr('r', 20)
      .attr('stroke-width', 2)
      .attr('stroke', d =>
        d.id === 'S' ? 'blue' : d.id === 'P' ? 'green' : 'white'
      ) // Color based on node id
      .attr('fill', 'transparent'); // Color based on node id

    // Append text labels for nodes
    const labels = svg
      .selectAll('text')
      .data(data.nodes)
      .enter()
      .append('text')
      .text(d => d.id)
      .attr('text-anchor', 'middle')
      .attr('alignment-baseline', 'middle')
      .attr('fill', 'white')
      .style('pointer-events', 'none');

    // Append lines for edges (links) and text labels for weights
    const links = svg.selectAll('line').data(data.edges).enter().append('g');

    links
      .append('line')
      .attr('stroke', 'gray')
      .attr('x1', d => data.nodes.find(n => n.id === d.from)!.x)
      .attr('y1', d => data.nodes.find(n => n.id === d.from)!.y)
      .attr('x2', d => data.nodes.find(n => n.id === d.to)!.x)
      .attr('y2', d => data.nodes.find(n => n.id === d.to)!.y);

    links
      .append('text')
      .text(d => String(d.weight))
      .attr('text-anchor', 'middle')
      .attr('fill', 'white')
      .attr(
        'x',
        d =>
          (data.nodes.find(n => n.id === d.from)!.x +
            data.nodes.find(n => n.id === d.to)!.x) /
          2
      )
      .attr(
        'y',
        d =>
          (data.nodes.find(n => n.id === d.from)!.y +
            data.nodes.find(n => n.id === d.to)!.y) /
          2
      )
      .style('pointer-events', 'none');

    // Tick function to update positions
    simulation.on('tick', () => {
      nodes.attr('cx', d => d.x!).attr('cy', d => d.y!);
      labels.attr('x', d => d.x!).attr('y', d => d.y!);
      links
        .select('line')
        .attr('x1', d => data.nodes.find(n => n.id === d.from)!.x)
        .attr('y1', d => data.nodes.find(n => n.id === d.from)!.y)
        .attr('x2', d => data.nodes.find(n => n.id === d.to)!.x)
        .attr('y2', d => data.nodes.find(n => n.id === d.to)!.y);
      links
        .select('text')
        .attr(
          'x',
          d =>
            (data.nodes.find(n => n.id === d.from)!.x +
              data.nodes.find(n => n.id === d.to)!.x) /
            2
        )
        .attr(
          'y',
          d =>
            (data.nodes.find(n => n.id === d.from)!.y +
              data.nodes.find(n => n.id === d.to)!.y) /
            2
        );
    });

    // Clean-up function
    // return () => {
    //   simulation.stop();
    // };
  }, [data]);

  return (
    <div className="flex flex-col">
      <div>shortest path: </div>
      <div>distance: </div>
      <svg ref={svgRef} />
    </div>
  );
};
