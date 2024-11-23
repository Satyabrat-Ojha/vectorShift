import { BaseNode } from "./baseNode";

export const LLMNode = ({ id }) => {
  const handles = [
    {
      type: "target",
      position: "left",
      id: `${id}-system`,
      style: { top: `${100 / 3}%` },
    },
    {
      type: "target",
      position: "left",
      id: `${id}-prompt`,
      style: { top: `${200 / 3}%` },
    },
    { type: "source", position: "right", id: `${id}-response` },
  ];

  const content = <span>This is a LLM.</span>;

  return <BaseNode id={id} title="LLM" content={content} handles={handles} />;
};
