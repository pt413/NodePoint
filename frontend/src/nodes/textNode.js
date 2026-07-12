import { useLayoutEffect, useMemo, useRef, useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

const extractVariables = (text) => {
  const regex = /{{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*}}/g;
  const variables = new Set();
  let match;

  while ((match = regex.exec(text)) !== null) {
    variables.add(match[1]);
  }

  return Array.from(variables);
};

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');
  const [textareaHeight, setTextareaHeight] = useState(80);

  const textareaRef = useRef(null);

  const MIN_TEXTAREA_HEIGHT = 50;
  const MAX_TEXTAREA_HEIGHT = 220;

  const VARIABLE_START_TOP = 112;
  const VARIABLE_GAP = 34;

  const variables = useMemo(() => {
    return extractVariables(currText);
  }, [currText]);

  useLayoutEffect(() => {
    const textarea = textareaRef.current;

    if (!textarea) {
      return;
    }

    textarea.style.height = 'auto';

    const nextHeight = Math.min(textarea.scrollHeight, MAX_TEXTAREA_HEIGHT);
    const finalHeight = Math.max(MIN_TEXTAREA_HEIGHT, nextHeight);

    setTextareaHeight(finalHeight);

    textarea.style.height = `${finalHeight}px`;
    textarea.style.overflowY =
      textarea.scrollHeight > MAX_TEXTAREA_HEIGHT ? 'auto' : 'hidden';
  }, [currText]);

  const nodeHeight = Math.max(
    175,
    textareaHeight + 115,
    VARIABLE_START_TOP + variables.length * VARIABLE_GAP + 20
  );

  const textareaWidth = Math.min(
    420,
    Math.max(230, currText.length * 3.2)
  );
  
  const nodeWidth = Math.max(330, textareaWidth + 95);

  return (
    <BaseNode
      nodeId={id}
      title="Text"
      description="Write text and use variables like {{input}}."
      width={nodeWidth}
      minHeight={nodeHeight}
      handles={[
        ...variables.map((variable, index) => ({
          type: 'target',
          position: Position.Left,
          id: `${id}-${variable}`,
          style: {
            top: `${VARIABLE_START_TOP + index * VARIABLE_GAP}px`,
            left: '-10px',
          },
        })),
        {
          type: 'source',
          position: Position.Right,
          id: `${id}-output`,
          style: {
            top: '50%',
            right: '-10px',
          },
        },
      ]}
    >
      {variables.map((variable, index) => (
        <div
          key={variable}
          className="text-variable-floating-label"
          style={{
            top: `${VARIABLE_START_TOP + index * VARIABLE_GAP}px`,
          }}
        >
          {variable}
        </div>
      ))}

      <label className="base-node-field text-input-field">
        <span>Text</span>
        <textarea
          ref={textareaRef}
          value={currText}
          onChange={(e) => setCurrText(e.target.value)}
          className="text-node-textarea"
        />
      </label>
    </BaseNode>
  );
};