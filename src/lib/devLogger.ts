export function devLogger(...args: unknown[]) {
  if (process.env.NODE_ENV !== 'development') return;

  console.log(
    `%c file path: ${__dirname}`,
    'background:#0ea5e9; color:white; padding: 1px 4px; border-radius: 3px;',
  );
  console.log(JSON.stringify(args, null, 2))
  return;
}
