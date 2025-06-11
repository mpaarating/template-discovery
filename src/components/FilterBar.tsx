import React from 'react';
import { SearchInput } from './common/SearchInput';
import { SortBySelector } from './common/SortBySelector';
import { CategoryMultiSelect } from './common/CategoryMultiSelect';

interface FilterBarProps<T extends string> {
  categories: string[];
  selectedCategories: string[];
  onCategoriesChange: (cats: string[]) => void;
  sortOptions: Record<T, React.ReactNode>;
  selectedSort: T;
  onSortChange: (sort: T) => void;
  query: string;
  onQueryChange: (q: string) => void;
  resultCount: number;
  onInputFocus?: () => void;
  onToggleDropdown?: () => void;
}

export function FilterBar<T extends string>({
  categories,
  selectedCategories,
  onCategoriesChange,
  sortOptions,
  selectedSort,
  onSortChange,
  query,
  onQueryChange,
  resultCount,
  onInputFocus,
  onToggleDropdown,
}: FilterBarProps<T>) {
  return (
    <div className='w-full flex flex-col gap-4'>
      <CategoryMultiSelect
        options={categories}
        selected={selectedCategories}
        onChange={onCategoriesChange}
      />
      <SortBySelector
        options={sortOptions}
        selected={selectedSort}
        onChange={onSortChange}
      />
      <SearchInput
        value={query}
        onChange={onQueryChange}
        resultCount={resultCount}
        onFocus={onInputFocus}
        onToggle={onToggleDropdown}
      />
    </div>
  );
}
