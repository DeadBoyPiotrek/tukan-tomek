export type GraphData = {
  nodes: string[];
  edges: {
    from: string;
    to: string;
    weight: number;
  }[];
};
