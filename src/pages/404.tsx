import Link from 'next/link';

export default function NotFound() {
  return (
    <main title="404" className="uppercase">
      <div className="flex flex-col justify-center items-start max-w-2xl mx-auto mb-16">
        <h1 className="font-bold text-3xl md:text-4xl tracking-tight mb-4 text-black dark:text-white">
          451 - UNAVAILABLE
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">Nothing but a 404 page.</p>
        <Link href="/">
          <a className="p-1 sm:p-4 w-full font-semibold tracking-wider mx-auto bg-gray-200 dark:bg-gray-800 text-center rounded-md text-black dark:text-white">
            Return Home
          </a>
        </Link>
      </div>
    </main>
  );
}
