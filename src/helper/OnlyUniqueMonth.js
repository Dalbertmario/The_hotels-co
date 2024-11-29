function getMonthName(monthNumber) {
  return new Intl.DateTimeFormat('en-US', { month: 'long' }).format(
    new Date(2024, monthNumber - 1),
  );
}
export default getMonthName;
