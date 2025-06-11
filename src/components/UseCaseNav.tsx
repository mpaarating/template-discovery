import { useMemo } from 'react';
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
        {/* "All" – acts as a reset / non-option */}
        <li key='__all__'>
          <button
            type='button'
            onClick={() => onSelect('')}
            aria-current={selected === '' ? 'true' : undefined}
            className={`relative w-full text-left px-4 py-2 transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary ${
              selected === ''
                ? 'before:content-[""] before:absolute before:inset-y-0 before:left-0 before:w-1 before:bg-primary text-gray-900 dark:text-gray-100 font-medium'
                : 'text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            All templates
          </button>
        </li>
        {useCases.map((useCase) => (
          <li key={useCase}>
            <button
              type='button'
              onClick={() => onSelect(useCase)}
              aria-current={useCase === selected ? 'true' : undefined}
              className={`relative w-full text-left px-4 py-2 transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary ${
                useCase === selected
                  ? 'before:content-[""] before:absolute before:inset-y-0 before:left-0 before:w-1 before:bg-primary text-gray-900 dark:text-gray-100 font-medium'
                  : 'text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              {useCase
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
