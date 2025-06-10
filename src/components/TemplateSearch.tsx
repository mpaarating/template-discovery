import React from "react";

import type { ZapTemplate } from "../types";

interface TemplateSearchProps {
  templates?: ZapTemplate[];
  onTemplateSelect?: (template: ZapTemplate) => void;
}

export const TemplateSearch: React.FC<TemplateSearchProps> = () => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-4">Search Templates</h2>
      <input
        type="text"
        placeholder="Search templates..."
        className="w-full p-2 border border-gray-300 rounded-md"
      />
    </div>
  );
};
