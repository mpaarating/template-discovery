import rawData from '../data/templates.large.json';
import type { ZapTemplate } from '../types';

// Helper to wrap a promise in a Suspense‐friendly way
function wrapPromise<T>(promise: Promise<T>) {
  let status: 'pending' | 'success' | 'error' = 'pending';
  let result: T;
  let error: unknown;

  const suspender = promise.then(
    (r) => {
      status = 'success';
      result = r;
    },
    (e) => {
      status = 'error';
      error = e;
    },
  );

  return {
    read(): T {
      if (status === 'pending') {
        throw suspender;
      } else if (status === 'error') {
        throw error;
      }
      return result!;
    },
  };
}

// Simulate a network fetch with a timeout
const fetchTemplates = () =>
  new Promise<ZapTemplate[]>((resolve) => {
    setTimeout(() => resolve(rawData as ZapTemplate[]), 2000);
  });

export const templatesResource = wrapPromise(fetchTemplates());

export function useTemplates(): ZapTemplate[] {
  return templatesResource.read();
}
