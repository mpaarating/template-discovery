import React, { Suspense, useState } from 'react';
import { useTemplates } from './hooks/useTemplates';
import type { ZapTemplate } from './types';
import { PageSkeleton } from './components/PageSkeleton';
import { UseCaseNav } from './components/UseCaseNav';
// import { UseCaseHero } from './components/UseCaseHero';

const TemplateSearch = React.lazy(() =>
  import('./components/TemplateSearch').then((module) => ({
    default: module.TemplateSearch,
  })),
);
const TemplateDetailModal = React.lazy(() =>
  import('./components/TemplateDetailModal').then((module) => ({
    default: module.TemplateDetailModal,
  })),
);

export default function App() {
  const templates = useTemplates();

  const [selectedTemplate, setSelectedTemplate] = useState<ZapTemplate | null>(
    null,
  );
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
                selectedTemplate={selectedTemplate}
                onTemplateSelect={setSelectedTemplate}
                useCase={selectedUseCase}
              />
            </section>

            <section className='bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg'>
              <Suspense fallback={<div>Loading details…</div>}>
                {selectedTemplate ? (
                  <TemplateDetailModal template={selectedTemplate} />
                ) : (
                  <div className='h-64 flex items-center justify-center text-gray-500 dark:text-gray-400'>
                    Select a template to see details
                  </div>
                )}
              </Suspense>
            </section>
          </main>
        </div>
      </div>
    </Suspense>
  );
}
