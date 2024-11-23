import { Handle, Position } from "reactflow";

export const BaseNode = ({
  id,
  title,
  handles = [],
  content,
  styles = { width: 200, height: 80, border: "1px solid black" },
}) => {
  return (
    <div style={styles}>
      <div>
        <span>{title}</span>
      </div>
      <div>{content}</div>
      {handles.map((handle, index) => (
        <Handle
          key={index}
          type={handle.type}
          position={handle.position}
          id={handle.id || `${id}-${handle.type}-${index}`}
          style={handle.style}
        />
      ))}
    </div>
  );
};
