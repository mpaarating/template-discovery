import { ComboboxOptions, ComboboxOption } from '@headlessui/react';
import { FixedSizeList } from 'react-window';
import type { ZapTemplate } from '../../types';
import { CheckIcon } from '@heroicons/react/24/outline';

interface TemplateListProps {
  sorted: ZapTemplate[];
  onSelect: (tpl: ZapTemplate) => void;
}

export function TemplateList({ sorted, onSelect }: TemplateListProps) {
  return (
    <ComboboxOptions
      static
      className='absolute mt-1 w-full bg-white dark:bg-gray-700 rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 z-10'
    >
      {sorted.length > 0 ? (
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
                className={({ active }) =>
                  `relative cursor-pointer select-none py-2 px-4 ${
                    active
                      ? 'bg-primary/20 text-primary dark:bg-primary/20 dark:text-primary'
                      : 'text-gray-900 dark:text-gray-100'
                  }`
                }
                onClick={() => onSelect(tpl)}
              >
                {({ selected }) => (
                  <>
                    <span
                      className={selected ? 'font-semibold' : 'font-normal'}
                    >
                      {tpl.title}
                    </span>
                    {selected && (
                      <span className='absolute inset-y-0 right-4 flex items-center text-primary'>
                        <CheckIcon className='h-5 w-5' aria-hidden='true' />
                      </span>
                    )}
                  </>
                )}
              </ComboboxOption>
            );
          }}
        </FixedSizeList>
      ) : (
        <div className='h-60 flex items-center justify-center text-gray-500 dark:text-gray-400'>
          No templates found
        </div>
      )}
    </ComboboxOptions>
  );
}
