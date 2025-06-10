import React from 'react';
import type { ZapTemplate } from '../types';

interface TemplateCardProps {
  template: ZapTemplate;
  onSelect: (tpl: ZapTemplate) => void;
}

export function TemplateCard({ template, onSelect }: TemplateCardProps) {
  return (
    <div
      onClick={() => onSelect(template)}
      className='p-4 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm hover:shadow-lg cursor-pointer transition-shadow'
    >
      <h3 className='text-lg font-semibold text-gray-900 dark:text-gray-100'>
        {template.title}
      </h3>
      <p className='mt-1 text-sm text-gray-600 dark:text-gray-400'>
        {template.description}
      </p>
    </div>
  );
}
