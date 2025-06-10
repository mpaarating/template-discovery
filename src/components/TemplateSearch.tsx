import React, { useState, useEffect } from "react";
import type { ZapTemplate } from "../types";
import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/24/outline";
import Fuse from "fuse.js";
import type { IFuseOptions } from "fuse.js";

interface TemplateSearchProps {
  templates: ZapTemplate[];
  selectedTemplate: ZapTemplate | null;
  onTemplateSelect: (template: ZapTemplate) => void;
}

export const TemplateSearch: React.FC<TemplateSearchProps> = ({
  templates,
  selectedTemplate,
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

  // Use Fuse.js for fuzzy search on the templates
  const fuse = React.useMemo(() => {
    const options: IFuseOptions<ZapTemplate> = {
      keys: ["title", "description", "apps.name", "categories", "use_cases"],
      threshold: 0.3,
      includeScore: true,
    };
    return new Fuse<ZapTemplate>(templates, options);
  }, [templates]);

  // Filter the templates based on the query
  const filtered = React.useMemo(() => {
    if (!debouncedQuery) return templates;
    // perform fuzzy search
    return fuse.search(debouncedQuery).map((result) => result.item);
  }, [debouncedQuery, fuse, templates]);

  return (
    <div className="space-y-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <Combobox value={selectedTemplate} onChange={onTemplateSelect}>
        <div className="relative">
          <ComboboxInput
            className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
            placeholder="Search templates…"
            aria-label="Search templates"
            displayValue={(template: ZapTemplate) => template?.title ?? ""}
            onChange={(e) => setQuery(e.target.value)}
          />

          <ComboboxButton className="absolute inset-y-0 right-0 flex items-center pr-2">
            <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden />
          </ComboboxButton>

          {filtered.length > 0 && (
            <ComboboxOptions className="absolute mt-1 max-h-60 w-full overflow-auto rounded bg-white dark:bg-gray-700 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
              {filtered.map((t) => (
                <ComboboxOption
                  key={t.id}
                  value={t}
                  className={({ focus }) =>
                    `relative cursor-pointer select-none py-2 pl-10 pr-4 ${
                      focus
                        ? "bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary"
                        : "text-gray-900 dark:text-gray-100"
                    }`
                  }
                >
                  {({ selected: isSelected, focus }) => (
                    <>
                      <span
                        className={`block truncate ${
                          isSelected ? "font-semibold" : "font-normal"
                        }`}
                      >
                        {t.title}
                      </span>
                      {isSelected && (
                        <span
                          className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                            focus ? "text-primary" : "text-gray-600"
                          }`}
                        >
                          <CheckIcon className="h-5 w-5" aria-hidden />
                        </span>
                      )}
                    </>
                  )}
                </ComboboxOption>
              ))}
            </ComboboxOptions>
          )}

          {filtered.length === 0 && (
            <div className="absolute mt-1 w-full px-4 py-2 text-gray-500">
              No templates found
            </div>
          )}
        </div>
      </Combobox>
    </div>
  );
};
