import React, { useState, useEffect } from "react";
import type { ZapTemplate } from "../types";

interface TemplateSearchProps {
  templates: ZapTemplate[];
  onTemplateSelect: (template: ZapTemplate) => void;
}

export const TemplateSearch: React.FC<TemplateSearchProps> = ({
  templates,
  onTemplateSelect,
}) => {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState(query);

  // Initialize the query from the URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const q = params.get("q") ?? "";
    setQuery(q);
    setDebouncedQuery(q);
  }, []);

  // Debounce the query
  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedQuery(query);
    }, 200);
    return () => clearTimeout(timeout);
  }, [query]);

  // Update the URL with the query
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (query) params.set("q", query);
    else params.delete("q");
    const newQuery = params.toString();
    window.history.pushState(
      null,
      "",
      newQuery ? `?${newQuery}` : window.location.pathname
    );
  }, [query]);

  // Filter the templates based on the query
  const filtered = React.useMemo(() => {
    if (!debouncedQuery) return templates;
    const lowerQuery = debouncedQuery.toLowerCase();
    return templates.filter(
      (template) =>
        template.title.toLowerCase().includes(lowerQuery) ||
        template.description.toLowerCase().includes(lowerQuery) ||
        template.apps.some((app) =>
          app.name.toLowerCase().includes(lowerQuery)
        ) ||
        template.categories.some((category) =>
          category.toLowerCase().includes(lowerQuery)
        ) ||
        template.use_cases.some((useCase) =>
          useCase.toLowerCase().includes(lowerQuery)
        )
    );
  }, [debouncedQuery, templates]);

  return (
    <div className="space-y-4 p-4 bg-white rounded shadow">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search templates…"
        aria-label="Search templates"
        className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:ring-primary/50"
      />

      <ul className="space-y-2 max-h-[400px] overflow-auto">
        {filtered.map((t) => (
          <li
            key={t.id}
            onClick={() => onTemplateSelect(t)}
            className="p-3 border rounded hover:bg-primary/10 cursor-pointer"
          >
            <h3 className="font-semibold">{t.title}</h3>
            <p className="text-sm text-gray-600 truncate">{t.description}</p>
          </li>
        ))}

        {filtered.length === 0 && (
          <li className="text-center text-gray-500">No templates found</li>
        )}
      </ul>
    </div>
  );
};
