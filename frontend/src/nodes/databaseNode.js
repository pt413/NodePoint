import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const DatabaseNode = ({ id }) => {
  const [table, setTable] = useState('users');

  return (
    <BaseNode
        nodeId={id}
      title="Database"
      description="Reads or writes data from a table."
      fields={[
        {
          name: 'table',
          label: 'Table',
          element: (
            <input value={table} onChange={(e) => setTable(e.target.value)} />
          ),
        },
      ]}
      handles={[
        {
          type: 'target',
          position: Position.Left,
          id: `${id}-query`,
        },
        {
          type: 'source',
          position: Position.Right,
          id: `${id}-result`,
        },
      ]}
    />
  );
};