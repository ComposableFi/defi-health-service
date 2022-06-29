export function dateToNumeric(date: string) {
  const datifiedDate = new Date(date);
  const options: Intl.DateTimeFormatOptions = {
    formatMatcher: 'best fit',
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: false,
  };
  return new Intl.DateTimeFormat('en-US', options).format(datifiedDate);
}

export function truncateAddress({
  address,
  length = 10,
}: {
  address: string;
  length?: number;
}): string {
  if(length >= address.length) return address;
  const sideLength = Math.floor(length / 2);
  const start = address.slice(0, sideLength);
  const end = address.slice(address.length - sideLength);
  return `${start}...${end}`;
}
