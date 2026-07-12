import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const TransformNode = ({ id }) => {
  const [operation, setOperation] = useState('uppercase');

  return (
    <BaseNode
        nodeId={id}
      title="Transform"
      description="Transforms incoming data."
      fields={[
        {
          name: 'operation',
          label: 'Operation',
          element: (
            <select
              value={operation}
              onChange={(e) => setOperation(e.target.value)}
            >
              <option value="uppercase">Uppercase</option>
              <option value="lowercase">Lowercase</option>
              <option value="trim">Trim</option>
              <option value="json">Parse JSON</option>
            </select>
          ),
        },
      ]}
      handles={[
        {
          type: 'target',
          position: Position.Left,
          id: `${id}-input`,
        },
        {
          type: 'source',
          position: Position.Right,
          id: `${id}-output`,
        },
      ]}
    />
  );
};