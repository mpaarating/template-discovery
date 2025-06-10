import React from 'react';

export function PageSkeleton() {
  return (
    <div className='min-h-screen w-full bg-gray-100 dark:bg-gray-900 animate-pulse'>
      <div className='h-12 bg-gray-200 dark:bg-gray-700 mb-6 mx-4 rounded' />

      <div className='flex'>
        <aside className='w-64 p-4 space-y-2'>
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className='h-8 bg-gray-200 dark:bg-gray-700 rounded' />
          ))}
        </aside>

        <main className='flex-1 p-6 space-y-6'>
          <div className='h-48 bg-gray-200 dark:bg-gray-700 rounded' />

          <div className='h-12 bg-gray-200 dark:bg-gray-700 rounded' />

          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className='h-32 bg-gray-200 dark:bg-gray-700 rounded'
              />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
