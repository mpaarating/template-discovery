import { Listbox } from '@headlessui/react';
import { CheckIcon } from '@heroicons/react/24/outline';

export interface CategoryMultiSelectProps {
  options: string[];
  selected: string[];
  onChange: (cats: string[]) => void;
}

export function CategoryMultiSelect({
  options,
  selected,
  onChange,
}: CategoryMultiSelectProps) {
  return (
    <fieldset className='relative w-full'>
      <label
        htmlFor='category-selector'
        className='block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300'
      >
        Categories
      </label>
      <Listbox value={selected} onChange={onChange} multiple>
        <Listbox.Button
          id='category-selector'
          className='w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600 rounded-md text-left'
        >
          {selected.length > 0 ? selected.join(', ') : 'Select categories'}
        </Listbox.Button>
        <Listbox.Options className='absolute mt-1 max-h-40 w-full overflow-auto bg-white dark:bg-gray-700 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-10'>
          {options.map((value) => (
            <Listbox.Option
              key={value}
              value={value}
              className={({ active }) =>
                `relative cursor-pointer select-none px-4 py-2 ${
                  active
                    ? 'bg-primary/20 text-primary'
                    : 'text-gray-900 dark:text-gray-100'
                }`
              }
            >
              {({ selected: isSelected }) => (
                <>
                  <span
                    className={isSelected ? 'font-semibold' : 'font-normal'}
                  >
                    {value}
                  </span>
                  {isSelected && (
                    <span className='absolute inset-y-0 right-4 flex items-center text-primary'>
                      <CheckIcon className='h-5 w-5' aria-hidden='true' />
                    </span>
                  )}
                </>
              )}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </Listbox>
    </fieldset>
  );
}
