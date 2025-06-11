import { ChevronUpDownIcon } from '@heroicons/react/24/outline';

interface SearchInputProps {
  value: string;
  onChange: (q: string) => void;
  resultCount: number;
  onFocus?: () => void;
  onToggle?: () => void;
}

export function SearchInput({
  value,
  onChange,
  resultCount,
  onFocus,
  onToggle,
}: SearchInputProps) {
  return (
    <fieldset className='w-full'>
      <label
        htmlFor='template-search'
        className='block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-1'
      >
        <span>Search templates</span>
        <span className='text-gray-500 dark:text-gray-400'>
          ({resultCount})
        </span>
      </label>
      <div className='relative w-full'>
        <input
          id='template-search'
          type='text'
          className='w-full px-4 py-3 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 placeholder-gray-400 dark:placeholder-gray-500'
          placeholder='Search templates…'
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={onFocus}
        />
        <button
          type='button'
          aria-label='Toggle template suggestions'
          className='absolute inset-y-0 right-0 flex items-center p-2 h-full'
          onClick={onToggle}
        >
          <ChevronUpDownIcon
            className='h-5 w-5 text-gray-400'
            aria-hidden='true'
          />
        </button>
        <span aria-live='polite' className='sr-only'>
          {resultCount} result{resultCount === 1 ? '' : 's'} found
        </span>
      </div>
    </fieldset>
  );
}
