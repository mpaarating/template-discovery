import React from 'react';

interface UseCaseHeroProps {
  useCase: string;
}

export const UseCaseHero: React.FC<UseCaseHeroProps> = ({ useCase }) => {
  if (!useCase) {
    return null;
  }

  return (
    <section className='bg-indigo-600 text-white rounded-lg p-6 mb-6 shadow'>
      <h2 className='text-xl font-semibold capitalize'>{useCase}</h2>
      <p className='text-sm mt-2'>
        Browse templates that help you automate{' '}
        <span className='font-medium'>{useCase}</span> workflows.
      </p>
    </section>
  );
};
