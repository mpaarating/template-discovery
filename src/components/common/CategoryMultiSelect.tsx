import React from 'react';
import {
  Listbox,
  Label,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from '@headlessui/react';

export interface SortBySelectorProps<T extends string> {
  options: Record<T, React.ReactNode>;
  selected: T;
  onChange: (sort: T) => void;
}

export function SortBySelector<T extends string>({
  options,
  selected,
  onChange,
}: SortBySelectorProps<T>) {
  return (
    <fieldset>
      <Label
        htmlFor='sort-selector'
        className='block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300'
      >
        Sort by
      </Label>
      <Listbox value={selected} onChange={onChange}>
        <ListboxButton
          id='sort-selector'
          className='w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600 rounded-md text-left'
        >
          {options[selected]}
        </ListboxButton>
        <ListboxOptions className='absolute mt-1 max-h-40 w-full overflow-auto bg-white dark:bg-gray-700 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-10'>
          {(Object.entries(options) as [T, React.ReactNode][]).map(
            ([value, label]) => (
              <ListboxOption
                key={value}
                value={value as T}
                className={({ focus }) =>
                  `cursor-pointer select-none px-4 py-2 ${
                    focus
                      ? 'bg-primary/20 text-primary'
                      : 'text-gray-900 dark:text-gray-100'
                  }`
                }
              >
                {({ selected: isSelected }) => (
                  <span
                    className={isSelected ? 'font-semibold' : 'font-normal'}
                  >
                    {label}
                  </span>
                )}
              </ListboxOption>
            ),
          )}
        </ListboxOptions>
      </Listbox>
    </fieldset>
  );
}
