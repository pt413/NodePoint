import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const APINode = ({ id }) => {
  const [method, setMethod] = useState('GET');
  const [url, setUrl] = useState('https://api.example.com');

  return (
    <BaseNode
        nodeId={id}
      title="API"
      description="Calls an external API endpoint."
      fields={[
        {
          name: 'method',
          label: 'Method',
          element: (
            <select value={method} onChange={(e) => setMethod(e.target.value)}>
              <option value="GET">GET</option>
              <option value="POST">POST</option>
              <option value="PUT">PUT</option>
              <option value="DELETE">DELETE</option>
            </select>
          ),
        },
        {
          name: 'url',
          label: 'URL',
          element: (
            <input value={url} onChange={(e) => setUrl(e.target.value)} />
          ),
        },
      ]}
      handles={[
        {
          type: 'target',
          position: Position.Left,
          id: `${id}-request`,
        },
        {
          type: 'source',
          position: Position.Right,
          id: `${id}-response`,
        },
      ]}
    />
  );
};