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
