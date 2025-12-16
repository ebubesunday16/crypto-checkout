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

const EXCHANGE_RATES: Record<string, number> = {
  'eth': 3500,       
  'usdt-cello': 1,    
  'usdt-ton': 1,      
  'usdt-bnb': 1,      
  'ngn': 0.0012,      
};

export const convertCrypto = (
  amount: string,
  fromCrypto: string,
  toCrypto: string
): string => {
  if (!amount || !fromCrypto || !toCrypto) return '';
  
  const numAmount = parseFloat(amount);
  if (isNaN(numAmount) || numAmount === 0) return '';
  
  // Convert to USD first, then to target crypto
  const usdValue = numAmount * (EXCHANGE_RATES[fromCrypto] || 0);
  const convertedAmount = usdValue / (EXCHANGE_RATES[toCrypto] || 1);
  
  // Round to 2 decimal places
  return convertedAmount.toFixed(2);
};