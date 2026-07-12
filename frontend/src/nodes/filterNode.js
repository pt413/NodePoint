import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const FilterNode = ({ id }) => {
  const [condition, setCondition] = useState('status === active');

  return (
    <BaseNode
      nodeId={id}
      title="Filter"
      description="Filters data using a condition."
      fields={[
        {
          name: 'condition',
          label: 'Condition',
          element: (
            <input
              value={condition}
              onChange={(e) => setCondition(e.target.value)}
            />
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