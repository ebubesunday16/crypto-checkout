export const formatAmountDisplay = (val: string) => {
  if (!val || val === '') return '';
  
  // Remove commas if they exist
  const cleaned = val.replace(/,/g, '');
  
  // Split on decimal
  const [integer = '', decimal] = cleaned.split('.');
  
  // Limit integer to 12 digits and add commas
  const formattedInteger = integer.slice(0, 12).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  
  // If user has typed a decimal point
  if (decimal !== undefined) {
    return `${formattedInteger || '0'}.${decimal.slice(0, 2)}`;
  }
  
  // No decimal typed yet
  return formattedInteger || '';
};

