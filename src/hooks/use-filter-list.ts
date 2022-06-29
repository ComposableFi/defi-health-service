import * as React from 'react';

function filterList<T>({
  text,
  rows,
  searchByKey,
}: {
  text: string;
  rows: Array<T>;
  searchByKey: keyof T;
}): Array<T> {
  if (!text) return rows;
  return rows.filter(row => {
    const rowText = row[searchByKey];
    return typeof rowText === 'string'
      ? rowText.toLowerCase().indexOf(text.toLowerCase()) > -1
      : false;
  });
}

export function useFilterList<T>(
  rows: Array<T>,
  searchByKey: keyof T
): [
  filteredRows: Array<T>,
  onSearch: (event: React.ChangeEvent<HTMLInputElement>) => void,
  setText: React.Dispatch<React.SetStateAction<string>>,
  text?: string
] {
  const [text, setText] = React.useState('');
  const filteredRows = React.useMemo(
    () => filterList({ text, rows, searchByKey }),
    [text, rows, searchByKey]
  );
  const onSearch = React.useCallback(
    ({ target }: React.ChangeEvent<HTMLInputElement>) => setText(target.value),
    []
  );
  return [filteredRows, onSearch, setText, text];
}
