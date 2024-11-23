import { useState } from "react";
import { BaseNode } from "./baseNode";

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || "{{input}}");

  const content = (
    <>
      <label>
        Text:
        <input
          type="text"
          value={currText}
          onChange={(e) => setCurrText(e.target.value)}
        />
      </label>
    </>
  );

  const handles = [{ type: "source", position: "right", id: `${id}-output` }];

  return <BaseNode id={id} title="Text" content={content} handles={handles} />;
};
