import { GraphData } from '@/types/types';
export const graphData = {
  nodes: ['S', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'P'].map(id => ({ id })),
  edges: [
    { from: 'S', to: 'A', weight: 4 },
    { from: 'S', to: 'B', weight: 3 },
    { from: 'A', to: 'C', weight: 5 },
    { from: 'A', to: 'D', weight: 2 },
    { from: 'B', to: 'D', weight: 4 },
    { from: 'B', to: 'E', weight: 7 },
    { from: 'C', to: 'F', weight: 3 },
    { from: 'C', to: 'G', weight: 8 },
    { from: 'D', to: 'G', weight: 4 },
    { from: 'E', to: 'H', weight: 2 },
    { from: 'F', to: 'P', weight: 5 },
    { from: 'G', to: 'P', weight: 6 },
    { from: 'H', to: 'P', weight: 3 },
    { from: 'E', to: 'F', weight: 6 },
    { from: 'D', to: 'H', weight: 5 },
  ],
};

export function dijkstra(graphData: GraphData, startNode: 'S') {
  const nodes = graphData.nodes;
  const edges = graphData.edges;

  const distances = {};
  const previous = {};
  const queue = [];

  nodes.forEach(node => {
    distances[node] = Infinity;
    previous[node] = null;
    queue.push(node);
  });

  distances[startNode] = 0;

  while (queue.length) {
    const sortedNodes = queue.sort((a, b) => distances[a] - distances[b]);
    const smallest = sortedNodes.shift();

    if (distances[smallest] === Infinity) {
      break;
    }

    edges
      .filter(edge => edge.from === smallest)
      .forEach(edge => {
        const candidate = distances[smallest] + edge.weight;
        if (candidate < distances[edge.to]) {
          distances[edge.to] = candidate;
          previous[edge.to] = smallest;
        }
      });
  }

  return { distances, previous };
}
