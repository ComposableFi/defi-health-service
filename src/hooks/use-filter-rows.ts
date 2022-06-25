import * as React from 'react';

function filterRows<Row>({ text, rows }: { text: string; rows: Array<Row & { name: string }> }) {
  return rows.filter(({ name }) => name.toLowerCase().indexOf(text.toLowerCase()) > -1);
}

export function useRowsFilter<Row>(
  rows: Array<Row & { name: string }>
): [
  filteredRows: Array<Row & { name: string }>,
  onSearch: (event: React.ChangeEvent<HTMLInputElement>) => void,
  setText: React.Dispatch<React.SetStateAction<string>>
] {
  const [text, setText] = React.useState('');
  const filteredRows = React.useMemo(() => filterRows({ text, rows }), [text, rows]);
  const onSearch = React.useCallback(
    ({ target }: React.ChangeEvent<HTMLInputElement>) => setText(target.value),
    []
  );
  return [filteredRows, onSearch, setText];
}
