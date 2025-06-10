import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
  Label,
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from '@headlessui/react';
import {
  ArrowDownIcon,
  ArrowUpIcon,
  CheckIcon,
  ChevronUpDownIcon,
} from '@heroicons/react/24/outline';
import type { IFuseOptions } from 'fuse.js';
import Fuse from 'fuse.js';
import React, { useEffect, useMemo, useState } from 'react';
import { FixedSizeList } from 'react-window';
import type { ZapTemplate } from '../types';
import { UseCaseSelector } from './common/UseCaseSelector';

interface TemplateSearchProps {
  templates: ZapTemplate[];
  selectedTemplate: ZapTemplate | null;
  onTemplateSelect: (template: ZapTemplate) => void;
  onUseCaseSelect: (useCase: string) => void;
  useCase: string;
}

export const TemplateSearch: React.FC<TemplateSearchProps> = ({
  templates,
  selectedTemplate,
  onTemplateSelect,
  onUseCaseSelect,
  useCase,
}) => {
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState(query);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<
    'popularity' | 'setup_time' | 'complexity'
  >('popularity');
  // Filter templates by selected use case
  const templatesByUseCase = useMemo(
    () =>
      useCase
        ? templates.filter((t) => t.use_cases.includes(useCase))
        : templates,
    [templates, useCase],
  );

  const useCases = useMemo(
    () => Array.from(new Set(templatesByUseCase.flatMap((t) => t.use_cases))),
    [templatesByUseCase],
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
  }, [debouncedQuery, fuse, templates, selectedCategories]);

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

  return (
    <div className='w-full space-y-6 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg'>
      {hasActiveFilters && (
        <div className='flex justify-end'>
          <button
            type='button'
            onClick={clearAll}
            className='text-sm text-primary  font-bolddark:text-primary bg-gray-200 dark:bg-gray-700 rounded-md px-4 py-2'
          >
            Clear all
          </button>
        </div>
      )}
      <UseCaseSelector
        options={useCases}
        selected={useCase}
        onChange={onUseCaseSelect}
      />
      <div>
        <Listbox
          multiple
          value={selectedCategories}
          onChange={setSelectedCategories}
        >
          <Label
            htmlFor='filter-categories'
            className='block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300'
          >
            Filter by categories
          </Label>
          <div className='relative w-full'>
            <ListboxButton
              id='filter-categories'
              className='w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600 rounded-md text-left'
            >
              {selectedCategories.length > 0
                ? selectedCategories.join(', ')
                : 'Filter by categories'}
            </ListboxButton>
            <ListboxOptions className='absolute mt-1 max-h-40 w-full overflow-auto bg-white dark:bg-gray-700 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-10'>
              {allCategories.map((category) => (
                <ListboxOption
                  key={category}
                  value={category}
                  className={({ focus }) =>
                    `cursor-pointer select-none px-4 py-2 ${
                      focus
                        ? 'bg-primary/20 text-primary'
                        : 'text-gray-900 dark:text-gray-100'
                    }`
                  }
                >
                  {({ selected }) => (
                    <>
                      <span className={`${selected ? 'font-semibold' : ''}`}>
                        {category}{' '}
                        {selected && (
                          <CheckIcon
                            className='h-5 w-5 text-primary inline-block'
                            aria-hidden='true'
                          />
                        )}
                      </span>
                    </>
                  )}
                </ListboxOption>
              ))}
            </ListboxOptions>
          </div>
        </Listbox>
      </div>
      <Combobox value={selectedTemplate} onChange={onTemplateSelect}>
        <Listbox value={sortBy} onChange={setSortBy}>
          <Label
            htmlFor='sort-templates'
            className='block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300'
          >
            Sort templates
          </Label>
          <div className='relative w-full'>
            <ListboxButton
              id='sort-templates'
              className='w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600 rounded-md text-left'
            >
              {sortLabels[sortBy]}
            </ListboxButton>
            <ListboxOptions className='absolute mt-1 max-h-40 w-full overflow-auto bg-white dark:bg-gray-700 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-10'>
              <ListboxOption
                className={({ focus }) =>
                  `cursor-pointer select-none px-4 py-2 ${
                    focus
                      ? 'bg-primary/20 text-primary'
                      : 'text-gray-900 dark:text-gray-100'
                  }`
                }
                value='popularity'
              >
                Popularity
              </ListboxOption>
              <ListboxOption
                className={({ focus }) =>
                  `cursor-pointer select-none px-4 py-2 ${
                    focus
                      ? 'bg-primary/20 text-primary'
                      : 'text-gray-900 dark:text-gray-100'
                  }`
                }
                value='setup_time'
              >
                Setup Time
              </ListboxOption>
              <ListboxOption
                className={({ focus }) =>
                  `cursor-pointer select-none px-4 py-2 ${
                    focus
                      ? 'bg-primary/20 text-primary'
                      : 'text-gray-900 dark:text-gray-100'
                  }`
                }
                value='complexity'
              >
                Complexity
              </ListboxOption>
            </ListboxOptions>
          </div>
        </Listbox>
        <div className='relative w-full'>
          <Label
            htmlFor='template-search'
            className='block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300'
          >
            Search templates {sorted.length > 0 ? `(${sorted.length})` : ''}
            <span aria-live='polite' aria-atomic='true' className='sr-only'>
              {sorted.length} results found
            </span>
          </Label>
          <div className='relative w-full'>
            <ComboboxInput
              id='template-search'
              className='
              w-full
              px-4 py-3
              bg-gray-100 dark:bg-gray-700
              text-gray-900 dark:text-gray-100
              border border-gray-300 dark:border-gray-600
              rounded-md
              focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50
              placeholder-gray-500
            '
              placeholder='Search templates…'
              displayValue={(t: ZapTemplate) => t?.title ?? ''}
              onChange={(e) => setQuery(e.target.value)}
            />

            <ComboboxButton
              aria-label='Toggle template suggestions'
              className='absolute inset-y-0 right-0 flex items-center p-2  h-full'
            >
              <ChevronUpDownIcon
                className='h-5 w-5 text-gray-400'
                aria-hidden
              />
            </ComboboxButton>
          </div>

          {sorted.length > 0 && (
            <ComboboxOptions className='absolute mt-1 w-full bg-white dark:bg-gray-700 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-10'>
              <div className='h-60'>
                <FixedSizeList
                  height={240}
                  itemCount={sorted.length}
                  itemSize={48}
                  width='100%'
                  overscanCount={10}
                >
                  {({ index, style }) => {
                    const tpl = sorted[index];
                    return (
                      <ComboboxOption
                        key={tpl.id}
                        value={tpl}
                        style={style}
                        className={({ focus }) =>
                          `relative cursor-pointer select-none py-2 px-4 ${
                            focus
                              ? 'bg-primary/20 text-primary dark:bg-primary/20 dark:text-primary'
                              : 'text-gray-900 dark:text-gray-100'
                          }`
                        }
                      >
                        {({ selected: isSelected }) => (
                          <span
                            className={`block truncate ${
                              isSelected ? 'font-semibold' : 'font-normal'
                            }`}
                          >
                            {tpl.title}{' '}
                            {isSelected && (
                              <CheckIcon
                                className='h-5 w-5 text-primary inline-block'
                                aria-hidden='true'
                              />
                            )}
                          </span>
                        )}
                      </ComboboxOption>
                    );
                  }}
                </FixedSizeList>
              </div>
            </ComboboxOptions>
          )}
        </div>
      </Combobox>

      {sorted.length === 0 && (
        <div className='mt-1 w-full px-4 py-2 text-center text-gray-500 dark:text-gray-400'>
          No templates found
        </div>
      )}
    </div>
  );
};
