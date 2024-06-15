'use client';
import React, { useEffect, useRef } from 'react';
import d3 from 'd3';

interface Node {
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

const Graph: React.FC<GraphProps> = ({ data }) => {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    const width = 800;
    const height = 600;

    // Clear previous content
    svg.selectAll('*').remove();

    const simulation = d3
      .forceSimulation(data.nodes)
      .force(
        'link',
        d3.forceLink(data.edges).id((d: Node) => d.id)
      )
      .force('charge', d3.forceManyBody().strength(-400))
      .force('center', d3.forceCenter(width / 2, height / 2));

    const link = svg
      .append('g')
      .attr('stroke', '#999')
      .attr('stroke-opacity', 0.6)
      .selectAll('line')
      .data(data.edges)
      .enter()
      .append('line')
      .attr('stroke-width', d => Math.sqrt(d.weight));

    const node = svg
      .append('g')
      .attr('stroke', '#fff')
      .attr('stroke-width', 1.5)
      .selectAll('circle')
      .data(data.nodes)
      .enter()
      .append('circle')
      .attr('r', 5)
      .attr('fill', '#69b3a2')
      .call(drag(simulation));

    node.append('title').text(d => d.id);

    simulation.on('tick', () => {
      link
        .attr('x1', d => (d.source as Node).x!)
        .attr('y1', d => (d.source as Node).y!)
        .attr('x2', d => (d.target as Node).x!)
        .attr('y2', d => (d.target as Node).y!);

      node.attr('cx', d => d.x!).attr('cy', d => d.y!);
    });

    function drag(simulation: d3.Simulation<Node, undefined>) {
      function dragstarted(
        event: d3.D3DragEvent<SVGCircleElement, Node, Node>,
        d: Node
      ) {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
      }

      function dragged(
        event: d3.D3DragEvent<SVGCircleElement, Node, Node>,
        d: Node
      ) {
        d.fx = event.x;
        d.fy = event.y;
      }

      function dragended(
        event: d3.D3DragEvent<SVGCircleElement, Node, Node>,
        d: Node
      ) {
        if (!event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
      }

      return d3
        .drag<SVGCircleElement, Node>()
        .on('start', dragstarted)
        .on('drag', dragged)
        .on('end', dragended);
    }
  }, [data]);

  return <svg ref={svgRef} width={800} height={600}></svg>;
};

export default Graph;
