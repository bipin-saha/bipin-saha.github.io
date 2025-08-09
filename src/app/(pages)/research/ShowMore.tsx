"use client";

import { useState } from "react";

const ShowMore = ({ content }: { content: string }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <>
      {isExpanded && content.slice(500, content.length)}
      <button
        onClick={() => {
          setIsExpanded(!isExpanded);
        }}
        className="font-bold"
      >
        {isExpanded ? ` less` : "..more"}
      </button>
    </>
  );
};

export default ShowMore;
