import React, { useState } from 'react';
import { Suspense } from 'react';
import { ListSkeleton } from './components/ListSkeleton';

import { useTemplates } from './hooks/useTemplates';
import type { ZapTemplate } from './types';

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

function App() {
  const [selectedTemplate, setSelectedTemplate] = useState<ZapTemplate | null>(
    null,
  );

  return (
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
      <main
        id='maincontent'
        className='w-full px-4 py-8 grid grid-cols-1 md:grid-cols-3 gap-6'
      >
        <section className='md:col-span-1'>
          <Suspense fallback={<ListSkeleton rows={6} />}>
            <TemplateSearchWrapper
              selectedTemplate={selectedTemplate}
              onTemplateSelect={setSelectedTemplate}
            />
          </Suspense>
        </section>
        <section className='md:col-span-2 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg'>
          <Suspense fallback={<div>Loading details…</div>}>
            {selectedTemplate && (
              <TemplateDetailModal template={selectedTemplate} />
            )}
          </Suspense>
        </section>
      </main>
    </div>
  );
}

export default App;

function TemplateSearchWrapper({
  selectedTemplate,
  onTemplateSelect,
}: {
  selectedTemplate: ZapTemplate | null;
  onTemplateSelect: React.Dispatch<React.SetStateAction<ZapTemplate | null>>;
}) {
  const templates = useTemplates();

  return (
    <TemplateSearch
      templates={templates}
      selectedTemplate={selectedTemplate}
      onTemplateSelect={onTemplateSelect}
    />
  );
}
