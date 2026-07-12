import { Handle } from 'reactflow';
import { useStore } from '../store';

export const BaseNode = ({
  nodeId,
  title,
  description,
  fields = [],
  handles = [],
  width = 220,
  minHeight = 110,
  children,
}) => {
  const deleteNode = useStore((state) => state.deleteNode);

  const handleDelete = (event) => {
    event.stopPropagation();
    deleteNode(nodeId);
  };

  return (
    <div className="base-node" style={{ width, minHeight }}>
      <div className="base-node-header">
        <span>{title}</span>

        {nodeId && (
          <button
            className="node-delete-button"
            type="button"
            onClick={handleDelete}
            title="Delete node"
          >
            -
          </button>
        )}
      </div>

      {description && (
        <div className="base-node-description">
          {description}
        </div>
      )}

      <div className="base-node-content">
        {fields.map((field) => (
          <label className="base-node-field" key={field.name}>
            <span>{field.label}</span>
            {field.element}
          </label>
        ))}

        {children}
      </div>

      {handles.map((handle) => (
        <Handle
          key={handle.id}
          type={handle.type}
          position={handle.position}
          id={handle.id}
          style={handle.style}
        />
      ))}
    </div>
  );
};