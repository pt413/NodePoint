import { DraggableNode } from './draggableNode';

export const PipelineToolbar = () => {
  return (
    <div className="toolbar">
      {/* <div className="toolbar-title">VectorShift Pipeline Builder</div> */}

      <div className="toolbar-items">
        <DraggableNode type="customInput" label="Input" />
        <DraggableNode type="llm" label="LLM" />
        <DraggableNode type="customOutput" label="Output" />
        <DraggableNode type="text" label="Text" />

        <DraggableNode type="filter" label="Filter" />
        <DraggableNode type="transform" label="Transform" />
        <DraggableNode type="api" label="API" />
        <DraggableNode type="condition" label="Condition" />
        <DraggableNode type="database" label="Database" />
      </div>
    </div>
  );
};