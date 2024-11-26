function datetimeformate(date) {
  const parsedate = new Date(date);
  return new Intl.DateTimeFormat('en', {
    month: 'short',
    year: 'numeric',
    day: 'numeric',
  }).format(parsedate);
}
export default datetimeformate;
