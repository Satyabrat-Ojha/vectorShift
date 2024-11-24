import { Handle, Position } from "reactflow";
import { useState } from "react";

export const BaseNode = ({
  id,
  title,
  handles = [],
  content,
  styles = {
    width: 220,
    height: "auto",
    borderRadius: "15px", // More curved borders
    background: "#f9f9f9", // Solid background color for the node
    padding: "15px",
    fontFamily: "Arial, sans-serif",
  },
}) => {
  const [editableTitle, setEditableTitle] = useState(title);

  // Handle title changes
  const handleTitleChange = (e) => {
    setEditableTitle(e.target.value);
  };

  return (
    <div
      style={{
        ...styles,
        background: "#f9f9f9", // Solid background for the node
        border: "2px solid transparent", // Transparent border to allow gradient only on the border
        borderRadius: "15px", // Curve the border more
        backgroundClip: "padding-box", // Makes sure the background doesn't overlap with the border
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Enhanced shadow effect
        transition: "all 0.3s ease", // Smooth transition for hover effects
        borderImage: "linear-gradient(135deg, #6e7bff, #7b8fff) 1", // Gradient border
      }}
      className="base-node"
    >
      <div>
        <input
          type="text"
          value={editableTitle}
          onChange={handleTitleChange}
          style={{
            fontSize: "16px",
            fontWeight: "bold",
            border: "none",
            borderBottom: "2px solid #ddd",
            marginBottom: "12px",
            padding: "6px 0",
            width: "100%",
            background: "transparent",
            outline: "none",
            color: "#333", // Title text color
            textAlign: "center",
          }}
        />
      </div>

      <div
        style={{
          padding: "10px",
          fontSize: "14px",
          color: "#333",
          textAlign: "center",
          borderRadius: "6px",
          backgroundColor: "transparent", // Content box background color
          // marginBottom: "15px",
        }}
      >
        {content}
      </div>

      {handles.map((handle, index) => (
        <Handle
          key={index}
          type={handle.type}
          position={handle.position}
          id={handle.id || `${id}-${handle.type}-${index}`}
          style={{
            ...handle.style,
            background: "#4A90E2", // Bright blue handles
            width: "12px",
            height: "12px",
            borderRadius: "50%",
            border: "2px solid #fff", // White border for the handles
            margin: "6px", // Add more margin for cleaner spacing
            boxSizing: "border-box",
            boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)", // Subtle shadow on handles
            transition: "transform 0.3s", // Smooth transform for hover effects
          }}
        />
      ))}
    </div>
  );
};
