import clsx from 'clsx';

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
        className={clsx(
          `text-xs px-2.5 py-0.5 rounded sm:max-w-28 block text-center leading-5 w-full`,
          color === 'green' && 'bg-green-300 text-green-800 dark:(bg-green-200 text-green-900)',
          color === 'red' && 'bg-red-200 text-red-800 dark:(bg-red-200 text-red-900)',
          color === 'yellow' &&
            'bg-yellow-100 text-yellow-800 dark:(bg-yellow-200 text-yellow-900)',
          color === 'gray' && 'bg-gray-100 text-gray-800 dark:bg-gray-200 text-gray-900',
          color === 'indigo' &&
            'bg-indigo-100 text-indigo-800 dark:(bg-indigo-200 text-indigo-900)',
          color === 'pink' && 'bg-pink-300 text-pink-800 dark:(bg-pink-200 text-pink-900)',
          color === 'purple' && 'bg-purple-100 text-purple-800 dark:(bg-purple-200 text-purple-900)'
        )}
      >
        {text}
      </span>
    </>
  );
}
