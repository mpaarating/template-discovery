import React from 'react';
import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/24/outline';

interface UseCaseSelectorProps {
  options: string[];
  selected: string;
  onChange: (value: string) => void;
}

export function UseCaseSelector({
  options,
  selected,
  onChange,
}: UseCaseSelectorProps) {
  return (
    <Listbox
      value={selected}
      onChange={onChange}
      as='div'
      className='mb-6 w-full'
      aria-label='Filter by use case'
    >
      <ListboxButton
        className='
        relative w-full cursor-default rounded-md
        border bg-white dark:bg-gray-700
        py-2 pl-3 pr-10 text-left
        shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
        sm:text-sm
      '
      >
        <span className='block truncate'>{selected || 'All Use Cases'}</span>
        <span className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2'>
          <ChevronUpDownIcon
            className='h-5 w-5 text-gray-400'
            aria-hidden='true'
          />
        </span>
      </ListboxButton>

      <ListboxOptions
        className='
        absolute z-10 mt-1 max-h-60 w-full
        overflow-auto rounded-md
        bg-white dark:bg-gray-800
        py-1 text-base shadow-lg
        ring-1 ring-black ring-opacity-5
        focus:outline-none sm:text-sm
      '
      >
        <ListboxOption
          value=''
          className={({ active }) =>
            `relative cursor-default select-none py-2 pl-10 pr-4 ${
              active
                ? 'bg-primary/10 text-primary'
                : 'text-gray-900 dark:text-gray-100'
            }`
          }
        >
          {({ selected, active }) => (
            <>
              <span
                className={`block truncate ${selected ? 'font-semibold' : ''}`}
              >
                All Use Cases
              </span>
              {selected && (
                <span
                  className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                    active ? 'text-primary' : 'text-gray-400'
                  }`}
                >
                  <CheckIcon className='h-5 w-5' aria-hidden='true' />
                </span>
              )}
            </>
          )}
        </ListboxOption>

        {options.map((uc) => (
          <ListboxOption
            key={uc}
            value={uc}
            className={({ focus }) =>
              `relative cursor-default select-none py-2 pl-10 pr-4 ${
                focus
                  ? 'bg-primary/10 text-primary'
                  : 'text-gray-900 dark:text-gray-100'
              }`
            }
          >
            {({ selected, focus }) => (
              <>
                <span
                  className={`block truncate ${selected ? 'font-semibold' : ''}`}
                >
                  {uc}
                </span>
                {selected && (
                  <span
                    className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                      focus ? 'text-primary' : 'text-gray-400'
                    }`}
                  >
                    <CheckIcon className='h-5 w-5' aria-hidden='true' />
                  </span>
                )}
              </>
            )}
          </ListboxOption>
        ))}
      </ListboxOptions>
    </Listbox>
  );
}
