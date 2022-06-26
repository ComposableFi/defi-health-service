import * as React from 'react';
import type {ServiceSchema} from '@/lib/schema.zod';

function filterRows({ text, rows }: { text: string; rows: Array<ServiceSchema> }) {
  return rows?.filter(({ name }) => name.toLowerCase().indexOf(text.toLowerCase()) > -1);
}

export function useRowsFilter(
  rows: Array<ServiceSchema>
): [
  filteredRows: Array<ServiceSchema>,
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
