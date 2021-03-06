import clsx from 'clsx';
import { SearchIcon } from '@/components/icons/search';

export function SearchBar({
  id,
  text,
  onInputChange,
}: {
  id?: string | number;
  text: string;
  onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="relative mb-6 w-full w-full" id={`${id}`}>
      <input
        id="search"
        onInput={onInputChange}
        placeholder={text}
        className={clsx(
          'dark:bg-dark-800 dark:bg-opacity-40 dark:text-gray-100 dark:placeholder-zinc-400 dark:border-rose-50 dark:border-opacity-20 dark:hover:border-gray-400',
          'ring-0 outline-0 focus:outline-none block w-full rounded-md border border-solid border-pink-200 bg-white px-4 py-2 text-gray-800 ring-transparent focus:ring-transparent focus:ring-offset-transparent outline-transparent ring-1 ring-opacity-30 focus:ring-zink-500'
        )}
      />
      <SearchIcon />
    </div>
  );
}
