import React from 'react';
import {
  Listbox,
  Label,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from '@headlessui/react';
import { CheckIcon } from '@heroicons/react/20/solid';

export interface UseCaseSelectorProps {
  options: string[];
  selected: string;
  onChange: (useCase: string) => void;
}

export function UseCaseSelector({
  options,
  selected,
  onChange,
}: UseCaseSelectorProps) {
  return (
    <fieldset>
      <Label htmlFor='use-case-selector'>Use case</Label>
      <Listbox value={selected} onChange={onChange}>
        <ListboxButton
          id='use-case-selector'
          className='w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600 rounded-md text-left'
        >
          {selected || 'Select a use case'}
        </ListboxButton>
        <ListboxOptions className='absolute mt-1 w-full overflow-auto bg-white dark:bg-gray-700 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-10'>
          {options.map((useCase) => (
            <ListboxOption key={useCase} value={useCase}>
              {({ focus, selected }) => (
                <div
                  className={`cursor-pointer select-none px-4 py-2 ${
                    focus
                      ? 'bg-primary/20 text-primary'
                      : 'text-gray-900 dark:text-gray-100'
                  }`}
                >
                  <span className={selected ? 'font-semibold' : 'font-normal'}>
                    {useCase}
                  </span>
                  {selected && (
                    <CheckIcon
                      className='h-5 w-5 text-primary inline-block'
                      aria-hidden='true'
                    />
                  )}
                </div>
              )}
            </ListboxOption>
          ))}
        </ListboxOptions>
      </Listbox>
    </fieldset>
  );
}
