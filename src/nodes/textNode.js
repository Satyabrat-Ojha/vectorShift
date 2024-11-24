import { useState, useEffect, useRef } from "react";
import { BaseNode } from "./baseNode";

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || "sample text");
  const [variables, setVariables] = useState([]);
  const textAreaRef = useRef(null);

  // Adjust the textarea height dynamically
  const adjustHeight = () => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "auto"; // Reset height
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`; // Set to scroll height
    }
  };

  const variableRegex = /{{\s*([a-zA-Z_$][a-zA-Z_$0-9]*)?\s*}}/g;

  // Extract variables, including empty `{{}}` placeholders
  const extractVariables = (text) => {
    const matches = Array.from(text.matchAll(variableRegex)).map(
      (match) => match[1] || ""
    ); // Handle empty matches
    return [...new Set(matches)]; // Ensure variables are unique
  };

  useEffect(() => {
    adjustHeight(); // Adjust height on component load
  }, []);

  const handleChange = (e) => {
    const newText = e.target.value;
    setCurrText(newText);
    adjustHeight();

    // Extract and update variables
    const detectedVariables = extractVariables(newText);
    setVariables(detectedVariables);
  };

  // Function to render variables in span tags
  const renderVariables = (variables) => {
    return variables.map((variable, index) => (
      <span
        key={index}
        style={{
          backgroundColor: "#e0f7fa", // Light background for variables
          padding: "2px 5px",
          borderRadius: "4px",
          margin: "0 5px",
          border: "1px solid #4caf50", // Green border for variables
        }}
      >
        {variable || "New Variable"}
      </span>
    ));
  };

  const content = (
    <>
      <label>
        <textarea
          ref={textAreaRef}
          onChange={handleChange}
          style={{
            width: "100%", // Adjust as needed
            overflow: "hidden", // Prevent scrollbar
            resize: "none", // Prevent manual resizing
            padding: "5px",
            lineHeight: "20px", // Align with line height
            fontFamily: "Arial, sans-serif",
            color: "black", // Text color for regular content
            backgroundColor: "transparent",
            borderRadius: "5px",
            marginLeft: "-3%",
          }}
          value={currText}
        />
      </label>

      {/* Below the textarea, render all the variable names in span tags */}
      <div style={{ marginTop: "10px", fontSize: "14px", lineHeight: "1.5" }}>
        <strong>Variables:</strong>
        <div
          style={{
            marginTop: "5px",
            display: "flex",
            flexWrap: "wrap",
            rowGap: "3",
          }}
        >
          {renderVariables(variables)}
        </div>
      </div>
    </>
  );

  const handles = [
    { type: "source", position: "right", id: `${id}-output` },
    ...variables.map((variable, index) => ({
      type: "target",
      position: "left",
      id: `${id}-${variable || `placeholder-${index}`}`, // Handle empty variables
      label: variable || "New Variable", // Label empty variables as placeholders
      style: {
        top: `calc(50% - ${(variables.length - 1) * 10}px + ${index * 20}px)`, // Centered handles
      },
    })),
  ];

  return <BaseNode id={id} title="Text" content={content} handles={handles} />;
};
