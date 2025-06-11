import { Combobox } from '@headlessui/react';
import { ArrowDownIcon, ArrowUpIcon } from '@heroicons/react/24/outline';
import type { IFuseOptions } from 'fuse.js';
import Fuse from 'fuse.js';
import React, { useEffect, useMemo, useState } from 'react';
import type { ZapTemplate } from '../types';
import { FilterBar } from './common/FilterBar';
import { TemplateList } from './common/TemplateList';
import { UseCaseHero } from './common/UseCaseHero';
import { TemplateDetailsModal } from './common/TemplateDetailsModal';

interface TemplateSearchProps {
  templates: ZapTemplate[];
  useCase: string;
}

export const TemplateSearch: React.FC<TemplateSearchProps> = ({
  templates,
  useCase,
}) => {
  // Local state for modal handling
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTemplate, setModalTemplate] = useState<ZapTemplate | null>(null);

  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState(query);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<
    'popularity' | 'setup_time' | 'complexity'
  >('popularity');

  // Control visibility of the template dropdown
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleTemplateSelect = (tpl: ZapTemplate) => {
    setModalTemplate(tpl);
    setModalOpen(true);
    setIsDropdownOpen(false);
  };

  // Close dropdown on click outside or on Escape key press
  const comboboxRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        comboboxRef.current &&
        !comboboxRef.current.contains(e.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    }

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Filter templates by selected use case
  const templatesByUseCase = useMemo(
    () =>
      useCase
        ? templates.filter((t) => t.use_cases.includes(useCase))
        : templates,
    [templates, useCase],
  );

  const sortLabels = {
    popularity: (
      <>
        Popularity{' '}
        <ArrowDownIcon
          className='h-5 w-5 text-black-800 font-bold inline-block'
          aria-hidden='true'
        />
      </>
    ),
    setup_time: (
      <>
        Fastest Setup{' '}
        <ArrowUpIcon
          className='h-5 w-5 text-black-800 font-bold inline-block'
          aria-hidden='true'
        />
      </>
    ),
    complexity: (
      <>
        Complexity{' '}
        <ArrowDownIcon
          className='h-5 w-5 text-black-800 font-bold inline-block'
          aria-hidden='true'
        />
      </>
    ),
  };

  // Initialize the query from the URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const q = params.get('q') ?? '';
    setQuery(q);
    setDebouncedQuery(q);
    const s =
      (params.get('sort') as 'popularity' | 'setup_time' | 'complexity') ??
      'popularity';
    setSortBy(s);
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
    if (query) params.set('q', query);
    else params.delete('q');
    const newQuery = params.toString();
    window.history.replaceState(
      null,
      '',
      newQuery ? `?${newQuery}` : window.location.pathname,
    );
  }, [query]);

  // Update the URL with the sortBy
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (sortBy) params.set('sort', sortBy);
    else params.delete('sort');
    const newSearch = params.toString();
    window.history.replaceState(
      null,
      '',
      newSearch ? `?${newSearch}` : window.location.pathname,
    );
  }, [sortBy]);

  const allCategories = useMemo(
    () => Array.from(new Set(templatesByUseCase.flatMap((t) => t.categories))),
    [templatesByUseCase],
  );

  // Use Fuse.js for fuzzy search on the templates
  const fuse = React.useMemo(() => {
    const options: IFuseOptions<ZapTemplate> = {
      keys: ['title', 'description', 'apps.name', 'categories', 'use_cases'],
      threshold: 0.3,
      includeScore: true,
    };
    return new Fuse<ZapTemplate>(templatesByUseCase, options);
  }, [templatesByUseCase]);

  // Filter the templates based on the debouncedQuery and selectedCategories
  const filtered = React.useMemo(() => {
    const initial = !debouncedQuery
      ? templatesByUseCase
      : fuse.search(debouncedQuery).map((r) => r.item);
    return selectedCategories.length > 0
      ? initial.filter((t) =>
          selectedCategories.every((cat) => t.categories.includes(cat)),
        )
      : initial;
  }, [debouncedQuery, fuse, selectedCategories, templatesByUseCase]);

  const sorted = useMemo(() => {
    const items = [...filtered];

    switch (sortBy) {
      case 'popularity':
        // descending popularity_score
        items.sort((a, b) => b.popularity_score - a.popularity_score);
        break;
      case 'setup_time':
        // ascending setup_time_minutes
        items.sort((a, b) => a.setup_time_minutes - b.setup_time_minutes);
        break;
      case 'complexity': {
        // map levels to numbers: { beginner: 0, intermediate: 1, advanced: 2 }
        const order = { beginner: 0, intermediate: 1, advanced: 2 };
        items.sort((a, b) => order[a.complexity] - order[b.complexity]);
        break;
      }
    }

    return items;
  }, [filtered, sortBy]);

  // show Clear All when any filter/search/sort is active
  const hasActiveFilters =
    query !== '' || selectedCategories.length > 0 || sortBy !== 'popularity';
  const clearAll = () => {
    setQuery('');
    setSelectedCategories([]);
    setSortBy('popularity');
  };

  // Reset category filters when the parent use-case changes so filters stay relevant
  useEffect(() => {
    setSelectedCategories([]);
  }, [useCase]);

  return (
    <div className='w-full space-y-6 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg'>
      {hasActiveFilters && (
        <button
          onClick={clearAll}
          className='text-sm text-primary font-bold bg-gray-200 dark:bg-gray-700 rounded-md px-4 py-2'
        >
          Clear all
        </button>
      )}
      <FilterBar
        categories={allCategories}
        selectedCategories={selectedCategories}
        onCategoriesChange={setSelectedCategories}
        sortOptions={sortLabels}
        selectedSort={sortBy}
        onSortChange={setSortBy}
        query={query}
        onQueryChange={setQuery}
        resultCount={sorted.length}
        onInputFocus={() => setIsDropdownOpen(true)}
        onToggleDropdown={() => setIsDropdownOpen((prev) => !prev)}
      />
      <div
        ref={comboboxRef}
        className='relative w-full'
        onKeyDown={(e) => {
          if (e.key === 'Escape') {
            setIsDropdownOpen(false);
          }
        }}
      >
        <Combobox value={modalTemplate} onChange={handleTemplateSelect}>
          {isDropdownOpen && (
            <TemplateList sorted={sorted} onSelect={handleTemplateSelect} />
          )}
        </Combobox>
      </div>
      <UseCaseHero useCase={useCase} />

      {/* Template details modal */}
      <TemplateDetailsModal
        template={modalTemplate}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </div>
  );
};
