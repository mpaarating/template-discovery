import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import type { ZapTemplate } from '../../types';

interface TemplateDetailsModalProps {
  template: ZapTemplate | null;
  isOpen: boolean;
  onClose: () => void;
}

export const TemplateDetailsModal: React.FC<TemplateDetailsModalProps> = ({
  template,
  isOpen,
  onClose,
}) => {
  // Gracefully handle null template
  const steps: string[] = template?.steps ?? [];
  const visibleSteps = steps.slice(0, 4);
  const hiddenStepsCount = steps.length - visibleSteps.length;

  // Reusable app logo that falls back to a colored circle when the logo URL is missing or fails to load
  const AppLogo: React.FC<{ name: string; iconUrl: string }> = ({
    name,
    iconUrl,
  }) => {
    const [errored, setErrored] = useState(false);

    if (!iconUrl || errored) {
      return (
        <div className='h-8 w-8 flex items-center justify-center rounded-full bg-primary/20 dark:bg-primary/30'>
          <span className='text-sm font-medium text-primary'>
            {name.charAt(0).toUpperCase()}
          </span>
        </div>
      );
    }

    return (
      <img
        src={iconUrl}
        alt={name}
        className='h-8 w-8 rounded'
        onError={() => setErrored(true)}
      />
    );
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as='div' className='relative z-50' onClose={onClose}>
        {/* Backdrop */}
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-black/50' aria-hidden='true' />
        </Transition.Child>

        <div className='fixed inset-0 overflow-y-auto'>
          <div className='flex min-h-full items-center justify-center p-4 text-center'>
            {/* Modal panel */}
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 scale-95'
              enterTo='opacity-100 scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 scale-100'
              leaveTo='opacity-0 scale-95'
            >
              <Dialog.Panel className='w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white dark:bg-gray-800 p-6 text-left align-middle shadow-xl transition-all'>
                {/* Header */}
                <div className='flex items-start justify-between'>
                  <div>
                    <Dialog.Title
                      as='h3'
                      className='text-lg font-bold leading-6 text-gray-900 dark:text-gray-100'
                    >
                      {template?.title ?? ''}
                    </Dialog.Title>
                    {template?.description && (
                      <p className='mt-1 text-sm text-gray-600 dark:text-gray-300'>
                        {template.description}
                      </p>
                    )}
                  </div>
                  <button
                    type='button'
                    className='rounded-md p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary'
                    onClick={onClose}
                  >
                    <span className='sr-only'>Close</span>
                    <XMarkIcon className='h-5 w-5' aria-hidden='true' />
                  </button>
                </div>

                {/* Section: Apps */}
                {template?.apps && template.apps.length > 0 && (
                  <div className='mt-6'>
                    <h4 className='mb-2 text-sm font-semibold text-gray-900 dark:text-gray-100'>
                      Apps
                    </h4>
                    <div className='flex flex-wrap gap-4 items-center'>
                      {template.apps.map((app) => (
                        <div key={app.slug} className='flex items-center gap-2'>
                          <AppLogo name={app.name} iconUrl={app.icon_url} />
                          <span className='text-sm font-medium text-gray-800 dark:text-gray-200'>
                            {app.name}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Section: Metadata */}
                {template && (
                  <div className='mt-6'>
                    <h4 className='mb-2 text-sm font-semibold text-gray-900 dark:text-gray-100'>
                      Metadata
                    </h4>
                    <div className='flex flex-wrap gap-2'>
                      {template.categories.map((cat) => (
                        <span
                          key={cat}
                          className='inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary dark:bg-primary/20'
                        >
                          {cat}
                        </span>
                      ))}
                      <span className='inline-flex items-center rounded-full bg-gray-200 dark:bg-gray-700 px-3 py-1 text-xs font-medium text-gray-800 dark:text-gray-200'>
                        {template.complexity}
                      </span>
                      <span className='inline-flex items-center rounded-full bg-gray-200 dark:bg-gray-700 px-3 py-1 text-xs font-medium text-gray-800 dark:text-gray-200'>
                        {template.setup_time_minutes} min setup
                      </span>
                    </div>
                  </div>
                )}

                {/* Section: Steps preview */}
                {visibleSteps.length > 0 && (
                  <div className='mt-6'>
                    <h4 className='mb-2 text-sm font-semibold text-gray-900 dark:text-gray-100'>
                      Steps preview
                    </h4>
                    <ol className='list-decimal pl-5 space-y-1 text-sm text-gray-700 dark:text-gray-300'>
                      {visibleSteps.map((step, idx) => (
                        <li key={idx}>{step}</li>
                      ))}
                      {hiddenStepsCount > 0 && (
                        <li className='italic text-gray-500 dark:text-gray-400'>
                          … +{hiddenStepsCount} more steps
                        </li>
                      )}
                    </ol>
                  </div>
                )}

                {/* Footer */}
                <div className='mt-8 flex justify-end gap-3'>
                  <button
                    type='button'
                    className='rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary'
                    onClick={onClose}
                  >
                    Cancel
                  </button>
                  <button
                    type='button'
                    className='inline-flex justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary'
                  >
                    Use this template
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
