'use client';
import { Graph } from '@/components/graph';
import { Inputs } from '@/components/inputs';
import { useEffect, useState } from 'react';
import { getGraphIds } from '@/lib/localStorage';
import type { GraphData } from '@/types/types';

const Home = () => {
  const [graphData, setGraphData] = useState<GraphData | null>(null);
  const [graphIds, setGraphIds] = useState<string[]>([]);
  const [currentGraphId, setCurrentGraphId] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const ids = getGraphIds();
      setGraphIds(ids);

      if (ids.length > 0) {
        await fetchGraphData(ids[0]);
        setCurrentGraphId(ids[0]);
      }
    };
    fetchData();
  }, []);

  const fetchGraphData = async (id: string) => {
    try {
      const response = await fetch(`/api/graph/?id=${id}`, {
        method: 'GET',
      });
      const data = await response.json();
      const graphData = JSON.parse(data.data);
      setGraphData(graphData);
    } catch (error) {
      console.error('Failed to fetch graph data:', error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen flex-col">
      <Inputs />
      {graphData ? (
        <Graph data={graphData} />
      ) : (
        <p>Load some data to show graph</p>
      )}
      {graphIds.length > 0 && (
        <div className="flex gap-3">
          <p className="p-2">Graphs</p>
          {graphIds.map(id => (
            <div className="relative group" key={id}>
              <button
                onClick={() => {
                  fetchGraphData(id);
                  navigator.clipboard.writeText(id);
                  setCurrentGraphId(id);
                }}
                className={`p-2 ${
                  currentGraphId === id ? 'text-blue-500' : ''
                }`}
              >
                {id}
              </button>
              <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full mb-2 hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2 whitespace-nowrap">
                Click to copy
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
