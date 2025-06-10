import React from 'react';
import { UseCaseSelector } from './UseCaseSelector';
import { CategoryMultiSelect } from './CategoryMultiSelect';
import { SortBySelector } from './common/SortBySelector';
import { SearchInput } from './common/SearchInput';

interface FilterBarProps<T extends string> {
  useCases: string[];
  selectedUseCase: string;
  onUseCaseChange: (useCase: string) => void;
  categories: string[];
  selectedCategories: string[];
  onCategoriesChange: (cats: string[]) => void;
  sortOptions: Record<T, React.ReactNode>;
  selectedSort: T;
  onSortChange: (sort: T) => void;
  query: string;
  onQueryChange: (q: string) => void;
  resultCount: number;
}

export function FilterBar<T extends string>({
  useCases,
  selectedUseCase,
  onUseCaseChange,
  categories,
  selectedCategories,
  onCategoriesChange,
  sortOptions,
  selectedSort,
  onSortChange,
  query,
  onQueryChange,
  resultCount,
}: FilterBarProps<T>) {
  return (
    <div className='w-full flex flex-wrap gap-4'>
      <UseCaseSelector
        options={useCases}
        selected={selectedUseCase}
        onChange={onUseCaseChange}
      />
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
      />
    </div>
  );
}
