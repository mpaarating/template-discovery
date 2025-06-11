import React, { Suspense, useState } from 'react';
import { useTemplates } from './hooks/useTemplates';
import { PageSkeleton } from './components/common/PageSkeleton';
import { UseCaseNav } from './components/UseCaseNav';

const TemplateSearch = React.lazy(() =>
  import('./components/TemplateSearch').then((module) => ({
    default: module.TemplateSearch,
  })),
);

export default function App() {
  const templates = useTemplates();

  const [selectedUseCase, setSelectedUseCase] = useState<string>('');

  return (
    <Suspense fallback={<PageSkeleton />}>
      <div className='min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900'>
        <a href='#maincontent' className='sr-only focus:not-sr-only'>
          Skip to main content
        </a>

        <header className='sticky top-0 z-20 h-16 flex items-center px-6 bg-white dark:bg-gray-900 shadow'>
          <h1 className='text-xl font-bold text-gray-900 dark:text-gray-100'>
            Template Discovery
          </h1>
        </header>

        <div className='flex flex-1' id='maincontent'>
          <aside className='flex-shrink-0 w-56 overflow-y-auto border-r bg-gray-50 dark:bg-gray-900/40 py-4'>
            <UseCaseNav
              templates={templates}
              selected={selectedUseCase}
              onSelect={setSelectedUseCase}
            />
          </aside>

          <main className='flex-1 p-6 overflow-y-auto'>
            <section className='mb-6'>
              <TemplateSearch
                templates={
                  selectedUseCase
                    ? templates.filter((t) =>
                        t.use_cases.includes(selectedUseCase),
                      )
                    : templates
                }
                useCase={selectedUseCase}
              />
            </section>
          </main>
        </div>
      </div>
    </Suspense>
  );
}
