import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const OutputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(
    data?.outputName || id.replace('customOutput-', 'output_')
  );

  const [outputType, setOutputType] = useState(data?.outputType || 'Text');

  return (
    <BaseNode
      nodeId={id}
      title="Output"
      description="Displays final pipeline result."
      fields={[
        {
          name: 'name',
          label: 'Name',
          element: (
            <input
              value={currName}
              onChange={(e) => setCurrName(e.target.value)}
            />
          ),
        },
        {
          name: 'type',
          label: 'Type',
          element: (
            <select
              value={outputType}
              onChange={(e) => setOutputType(e.target.value)}
            >
              <option value="Text">Text</option>
              <option value="Image">Image</option>
            </select>
          ),
        },
      ]}
      handles={[
        {
          type: 'target',
          position: Position.Left,
          id: `${id}-value`,
        },
      ]}
    />
  );
};