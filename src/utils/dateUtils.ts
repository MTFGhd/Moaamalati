export const formatDate = (date: string): string => {
  return new Date(date).toLocaleDateString('en-US', { year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

export const getCurrentMonth = (): string => {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
};

export const getMonthName = ( dateStr : string ) : string => {
  const [ year , month ] = dateStr.split('-');
  return new Date( parseInt(year) , parseInt(month) - 1).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long'
  });
};

export const isCurrentMonth = (date: string): boolean => {
  const transactionMonth = date.substring(0, 7);
  return transactionMonth === getCurrentMonth();
};