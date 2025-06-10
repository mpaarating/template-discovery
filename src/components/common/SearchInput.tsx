import { ComboboxButton, ComboboxInput } from '@headlessui/react';
import { ChevronUpDownIcon } from '@heroicons/react/24/outline';

interface SearchInputProps {
  value: string;
  onChange: (q: string) => void;
  resultCount: number;
}

export function SearchInput({
  value,
  onChange,
  resultCount,
}: SearchInputProps) {
  return (
    <div className='relative w-full'>
      <ComboboxInput
        id='template-search'
        className='w-full px-4 py-3 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 placeholder-gray-400 dark:placeholder-gray-500'
        placeholder='Search templates…'
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <ComboboxButton
        aria-label='Toggle template suggestions'
        className='absolute inset-y-0 right-0 flex items-center p-2 h-full'
      >
        <ChevronUpDownIcon
          className='h-5 w-5 text-gray-400'
          aria-hidden='true'
        />
      </ComboboxButton>
      <span aria-live='polite' className='sr-only'>
        {resultCount} result{resultCount === 1 ? '' : 's'} found
      </span>
    </div>
  );
}
