import { Box } from '@/components/box';
import Graph from '@/components/graph';
import { Graph2 } from '@/components/graph2';
import { graphData } from '@/lib/algorithm';
const Home = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      {/* <Box /> */}
      {/* <Graph data={graphData} /> */}
      <Graph2 data={graphData} />
    </div>
  );
};

export default Home;
