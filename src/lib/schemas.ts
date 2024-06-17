import { z } from 'zod';

export const graphDataSchema = z.object({
  graphData: z.string().refine(
    value => {
      try {
        const data = JSON.parse(value);
        const nodes = data.nodes;
        const edges = data.edges;

        if (!Array.isArray(nodes) || !Array.isArray(edges)) return false;

        const uniqueNodes = new Set(nodes);
        if (uniqueNodes.size !== nodes.length) return false;

        for (const edge of edges) {
          if (
            typeof edge.from !== 'string' ||
            typeof edge.to !== 'string' ||
            typeof edge.weight !== 'number'
          )
            return false;
          if (edge.from === edge.to) return false;
          if (edge.weight < 0) return false;
          if (!nodes.includes(edge.from) || !nodes.includes(edge.to))
            return false;
        }

        return true;
      } catch (e) {
        return false;
      }
    },
    {
      message: 'Invalid graph data',
    }
  ),
});

export const graphIdSchema = z.object({
  id: z.string().min(1),
});
