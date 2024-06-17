import { GraphData } from '@/types/types';

export function dijkstra(graphData: GraphData) {
  const nodes = graphData.nodes;
  const edges = graphData.edges;
  const startNode = 'S';
  const endNode = 'P';
  const shortestDistances: { [key: string]: number } = {};
  const unvisitedNodes = new Set(nodes);
  const previousNodes: { [key: string]: string | null } = {};

  nodes.forEach(node => {
    shortestDistances[node] = node === startNode ? 0 : Infinity;
    previousNodes[node] = null;
  });

  while (unvisitedNodes.size) {
    // Find the unvisited node with the smallest distance
    let closestNode: string | null = null;
    let smallestDistance = Infinity;

    unvisitedNodes.forEach(node => {
      if (shortestDistances[node] < smallestDistance) {
        smallestDistance = shortestDistances[node];
        closestNode = node;
      }
    });

    if (closestNode === null) {
      break;
    }

    // Update distances of neighbors
    const currentDistance = shortestDistances[closestNode];
    edges.forEach(edge => {
      if (edge.from === closestNode && unvisitedNodes.has(edge.to)) {
        const newDistance = currentDistance + edge.weight;
        if (newDistance < shortestDistances[edge.to]) {
          shortestDistances[edge.to] = newDistance;
          previousNodes[edge.to] = closestNode;
        }
      } else if (edge.to === closestNode && unvisitedNodes.has(edge.from)) {
        const newDistance = currentDistance + edge.weight;
        if (newDistance < shortestDistances[edge.from]) {
          shortestDistances[edge.from] = newDistance;
          previousNodes[edge.from] = closestNode;
        }
      }
    });

    unvisitedNodes.delete(closestNode);
  }

  // Reconstruct the shortest path
  const path = [];
  let currentNode: string | null = endNode;

  while (currentNode !== null) {
    path.unshift(currentNode);
    currentNode = previousNodes[currentNode];
  }

  // If the start node is not at the beginning of the path, it means there's no path
  if (path[0] !== startNode) {
    return { path: [], totalWeight: Infinity };
  }

  return { path, totalWeight: shortestDistances[endNode] };
}
