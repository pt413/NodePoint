import { useState } from 'react';
import { useStore } from './store';

export const SubmitButton = () => {
  const nodes = useStore((state) => state.nodes);
  const edges = useStore((state) => state.edges);
  const clearPipeline = useStore((state) => state.clearPipeline);

  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setLoading(true);

      const payload = {
        nodes: nodes.map((node) => ({
          id: node.id,
          type: node.type,
          data: node.data,
        })),
        edges: edges.map((edge) => ({
          id: edge.id,
          source: edge.source,
          target: edge.target,
          sourceHandle: edge.sourceHandle,
          targetHandle: edge.targetHandle,
        })),
      };

      const response = await fetch('http://localhost:8000/pipelines/parse', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Backend request failed');
      }

      const data = await response.json();

      alert(
          `Number of Nodes: ${data.num_nodes}\n` +
          `Number of Edges: ${data.num_edges}\n` +
          `Is DAG: ${data.is_dag ? 'True' : 'False'}`
      );
    } catch (error) {
      console.error(error);
      alert('Failed to submit pipeline. Please check if backend is running.');
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    clearPipeline();
  };

  return (
    <div className="submit-section">
      <div className="submit-actions">
        <button
          className="submit-button"
          type="button"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? 'Analyzing...' : 'Submit'}
        </button>

        <button
          className="clear-button"
          type="button"
          onClick={handleClear}
          disabled={nodes.length === 0 && edges.length === 0}
        >
          Clear
        </button>
      </div>
    </div>
  );
};