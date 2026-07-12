import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const InputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(
    data?.inputName || id.replace('customInput-', 'input_')
  );

  const [inputType, setInputType] = useState(data?.inputType || 'Text');

  return (
    <BaseNode
      nodeId={id}
      title="Input"
      description="Accepts external input."
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
              value={inputType}
              onChange={(e) => setInputType(e.target.value)}
            >
              <option value="Text">Text</option>
              <option value="File">File</option>
            </select>
          ),
        },
      ]}
      handles={[
        {
          type: 'source',
          position: Position.Right,
          id: `${id}-value`,
        },
      ]}
    />
  );
};