import * as React from 'react';

export function Badge({
  text,
  color,
}: {
  text: string;
  color: 'blue' | 'green' | 'red' | 'yellow' | 'gray' | 'indigo' | 'pink' | 'purple';
}) {
  return (
    <>
      <span
        className={`bg-${color}-100 text-${color}-800 text-xs px-2.5 py-0.5 rounded dark:bg-${color}-200 dark:text-${color}-900 sm:w-20 block text-center`}
      >
        {text}
      </span>
    </>
  );
}
