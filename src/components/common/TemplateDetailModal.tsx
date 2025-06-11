import React from 'react';
import type { ZapTemplate } from '../../types';

interface TemplateDetailModalProps {
  template: ZapTemplate;
}

export const TemplateDetailModal: React.FC<TemplateDetailModalProps> = ({
  template,
}) => {
  return (
    <div className='bg-white p-4 rounded-lg shadow-md'>
      <h2 className='text-lg font-semibold mb-4'>{template.title}</h2>
      <p className='text-gray-700'>{template.description}</p>
    </div>
  );
};

export default TemplateDetailModal;
