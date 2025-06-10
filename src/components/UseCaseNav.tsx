import React, { useMemo } from 'react';
import type { ZapTemplate } from '../types';

interface UseCaseNavProps {
  templates: ZapTemplate[];
  selected: string;
  onSelect: (useCase: string) => void;
}

export function UseCaseNav({ templates, selected, onSelect }: UseCaseNavProps) {
  // Derive unique use-case names from the templates' use_cases field
  const useCases = useMemo(() => {
    const all = templates.flatMap((t) => t.use_cases);
    return Array.from(new Set(all));
  }, [templates]);

  return (
    <nav aria-label='Use cases'>
      <ul className='space-y-2'>
        {useCases.map((uc) => (
          <li key={uc}>
            <button
              type='button'
              onClick={() => onSelect(uc)}
              aria-current={uc === selected ? 'true' : undefined}
              className={`w-full text-left px-4 py-2 rounded-md transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary ${
                uc === selected
                  ? 'bg-primary text-white'
                  : 'text-gray-800 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              {uc
                .split(' ')
                .map((word) =>
                  word
                    .split('-')
                    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
                    .join('-'),
                )
                .join(' ')}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
