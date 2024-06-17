import React, { useEffect, useRef, useState } from 'react';
import { dijkstra } from '@/lib/algorithm';
import { GraphData } from '@/types/types';
import * as d3 from 'd3';

interface Node {
  id: string;
  x: number;
  y: number;
}

interface Edge {
  from: string;
  to: string;
  weight: number;
}

export const Graph = ({ data }: { data: GraphData }) => {
  const d3Nodes = data.nodes.map((node, index) => ({
    id: node,
    x: 100 + index * 50,
    y: Math.random() * 500,
  }));
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [path, setPath] = useState<string[]>([]);
  const [totalWeight, setTotalWeight] = useState<number>(0);

  useEffect(() => {
    const { path, totalWeight } = dijkstra(data);
    setPath(path);
    setTotalWeight(totalWeight);

    if (!svgRef.current) return;

    const svg = d3
      .select(svgRef.current)
      .attr('width', 800)
      .attr('height', 600)
      .style('border', '1px solid white');

    // Clear existing elements
    svg.selectAll('*').remove();

    // Function to check if an edge is part of the shortest path
    const isEdgeInPath = (from: string, to: string, path: string[]) => {
      for (let i = 0; i < path.length - 1; i++) {
        if (
          (path[i] === from && path[i + 1] === to) ||
          (path[i] === to && path[i + 1] === from)
        ) {
          return true;
        }
      }
      return false;
    };

    // Append lines for edges (links) and text labels for weights
    const links = svg.selectAll('line').data(data.edges).join('g');

    links
      .append('line')
      .attr('stroke', d =>
        isEdgeInPath(d.from, d.to, path) ? 'yellow' : 'gray'
      )
      .attr('stroke-width', 1)
      .attr('x1', d => d3Nodes.find(n => n.id === d.from)!.x)
      .attr('y1', d => d3Nodes.find(n => n.id === d.from)!.y)
      .attr('x2', d => d3Nodes.find(n => n.id === d.to)!.x)
      .attr('y2', d => d3Nodes.find(n => n.id === d.to)!.y);

    links
      .append('text')
      .text(d => String(d.weight))
      .attr('text-anchor', 'middle')
      .attr('fill', 'white')
      .attr(
        'x',
        d =>
          (d3Nodes.find(n => n.id === d.from)!.x +
            d3Nodes.find(n => n.id === d.to)!.x) /
          2
      )
      .attr(
        'y',
        d =>
          (d3Nodes.find(n => n.id === d.from)!.y +
            d3Nodes.find(n => n.id === d.to)!.y) /
          2
      )
      .style('pointer-events', 'none');

    const nodeGroup = svg
      .selectAll('g.node')
      .data(d3Nodes)
      .join('g')
      .attr('class', 'node');

    nodeGroup
      .append('circle')
      .attr('r', 20)
      .attr('stroke-width', 2)
      .attr('stroke', d =>
        d.id === 'S' ? 'blue' : d.id === 'P' ? 'green' : 'white'
      )
      .attr('fill', 'transparent')
      .attr('cx', d => d.x)
      .attr('cy', d => d.y);

    // Append text labels for nodes
    nodeGroup
      .append('text')
      .text(d => d.id)
      .attr('text-anchor', 'middle')
      .attr('alignment-baseline', 'middle')
      .attr('fill', 'white')
      .attr('x', d => d.x)
      .attr('y', d => d.y)
      .style('pointer-events', 'none');
  }, [data]);

  return (
    <div className="flex flex-col">
      <div>
        Shortest path:{' '}
        {path.map((node, i) => (
          <span key={node}>
            {node}
            {i < path.length - 1 && ' -> '}
          </span>
        ))}
      </div>
      <div>Distance: {totalWeight}</div>
      <svg ref={svgRef} />
    </div>
  );
};
