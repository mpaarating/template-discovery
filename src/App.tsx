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
      <div className='min-h-screen w-full bg-gray-100 dark:bg-gray-900'>
        <a href='#maincontent' className='sr-only focus:not-sr-only'>
          Skip to main content
        </a>

        <header className='bg-white shadow w-full'>
          <div className='w-full px-4 py-4'>
            <h1 className='text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6'>
              Template Discovery
            </h1>
          </div>
        </header>

        <div className='flex h-full' id='maincontent'>
          <aside className='w-64 border-r bg-white dark:bg-gray-800 p-4'>
            <UseCaseNav
              templates={templates}
              selected={selectedUseCase}
              onSelect={setSelectedUseCase}
            />
          </aside>

          <main className='flex-1 px-6 py-8 overflow-auto'>
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
                onUseCaseSelect={setSelectedUseCase}
              />
            </section>

            <section className='bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg'>
              <Suspense fallback={<div>Loading details…</div>}>
                {selectedTemplate && (
                  <TemplateDetailModal template={selectedTemplate} />
                )}
              </Suspense>
            </section>
          </main>
        </div>
      </div>
    </Suspense>
  );
}
