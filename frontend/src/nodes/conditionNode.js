import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const ConditionNode = ({ id }) => {
  const [rule, setRule] = useState('score > 80');

  return (
    <BaseNode
        nodeId={id}
      title="Condition"
      description="Branches pipeline into true or false paths."
      fields={[
        {
          name: 'rule',
          label: 'Rule',
          element: (
            <input value={rule} onChange={(e) => setRule(e.target.value)} />
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
          id: `${id}-true`,
          style: { top: '40%' },
        },
        {
          type: 'source',
          position: Position.Right,
          id: `${id}-false`,
          style: { top: '70%' },
        },
      ]}
    />
  );
};