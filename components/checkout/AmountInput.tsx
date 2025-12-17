import images from '@/assets'
import { formatAmountDisplay } from '@/utility/func';
import Image from 'next/image';
import React from 'react'
import { ChevronDown, Search } from 'lucide-react';

const CRYPTOCURRENCIES = [
    {id: 'eth', label: 'ETH', logo: images.cryptocurrencies.ETH},
    {id: 'usdt-cello', label: 'USDT - CELO', logo: images.cryptocurrencies.USDT_CELLO},
    {id: 'usdt-ton', label: 'USDT - TON', logo: images.cryptocurrencies.USDT_TON},
    {id: 'usdt-bnb', label: 'USDT - BNB', logo: images.cryptocurrencies.USDT_BNB},
    {id: 'ngn', label: 'NGN', logo: images.cryptocurrencies.NGN},
]

interface AmountInputType {
  value: string
  onChange: (val: string) => void,
  placeholder: string,
  label: string,
  selectedCrypto: string
  onCryptoChange: React.Dispatch<React.SetStateAction<string>>
}

const AmountInput = ({ 
  value, 
  onChange, 
  placeholder, 
  label,
  selectedCrypto,
  onCryptoChange
} : AmountInputType) => {

  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState('');

    const inputRef = React.useRef<HTMLInputElement>(null);
    const [cursorPosition, setCursorPosition] = React.useState<number | null>(null);

    const dropdownRef = React.useRef<HTMLDivElement>(null);

    const currentCrypto = CRYPTOCURRENCIES.find(c => c.id === selectedCrypto) || CRYPTOCURRENCIES[0];
    
    const filteredCryptoCurrencies = CRYPTOCURRENCIES
      .filter(item => item.id !== currentCrypto.id)
      .filter(item => 
        item.label.toLowerCase().includes(searchQuery.toLowerCase())
      );

    React.useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
          setIsDropdownOpen(false);
        }
      };
      
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    React.useEffect(() => {
      if (!isDropdownOpen) {
        setSearchQuery('');
      }
    }, [isDropdownOpen]);
    
    React.useEffect(() => {
      if (inputRef.current && cursorPosition !== null) {
        inputRef.current.setSelectionRange(cursorPosition, cursorPosition);
      }
    }, [cursorPosition, value]);
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const input = e.target.value;
      const currentCursorPos = e.target.selectionStart || 0;
      
      // Remove commas and .00 suffix for processing
      let cleaned = input.replace(/,/g, '');
      
      // If user is trying to delete the .00 suffix, prevent it
      if (cleaned.endsWith('.00') && value && !value.includes('.')) {
        cleaned = cleaned.replace('.00', '');
      }
      
      // Validate: only digits and one decimal point with max 2 decimals
      if (cleaned === '' || /^\d*\.?\d{0,2}$/.test(cleaned)) {
        // Calculate how many commas are before cursor in old value
        const oldDisplay = formatAmountDisplay(value) + (value && !value.includes('.') ? '.00' : '');
        const commasBeforeCursorOld = (oldDisplay.slice(0, currentCursorPos).match(/,/g) || []).length;
        
        // Calculate new cursor position
        const newDisplay = formatAmountDisplay(cleaned) + (cleaned && !cleaned.includes('.') ? '.00' : '');
        const commasBeforeCursorNew = (newDisplay.slice(0, currentCursorPos).match(/,/g) || []).length;
        
        const diff = commasBeforeCursorNew - commasBeforeCursorOld;
        let newCursorPos = currentCursorPos + diff;
        
        // If we're before the .00 suffix, keep cursor there
        if (cleaned && !cleaned.includes('.') && newCursorPos > newDisplay.length - 3) {
          newCursorPos = newDisplay.length - 3;
        }
        
        onChange(cleaned);
        setCursorPosition(newCursorPos);
      }
    };
    
    const displayValue = formatAmountDisplay(value);
    const finalDisplay = value && !value.includes('.') ? `${displayValue}.00` : displayValue;
    
    return (
      <div className='space-y-1 p-5 rounded-[24] border border-[#E0E0E0] w-full'>
        <p className='text-sm text-[#828282] font-medium select-none'>{label}</p>
        <div className='flex justify-between items-center gap-2'>
          <input 
            ref={inputRef}
            type="text"
            value={finalDisplay}
            placeholder={placeholder || "0.00"}
            onChange={handleChange}
            className="font-semibold text-xl outline-none flex-1 max-w-[160] sm:max-w-none min-w-0"
            inputMode="decimal"
          />
          
          <div className='relative ' ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className='flex items-center gap-1 bg-[#F7F7F7] border border-[#E0E0E0] px-2 py-1 rounded-[20] shrink-0 hover:bg-gray-100 transition-colors'
            >
              <Image 
                src={currentCrypto.logo}
                width={20}
                height={20}
                alt={`${currentCrypto.label} logo`}
                className='rounded-full'
              />
              <span className='block text-green text-xs select-none no-wrap'>
                {currentCrypto.label}
              </span> 
              <ChevronDown     
                className={`text-green transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
                strokeWidth={1.4}
                size={16}
              />
            </button>
            
            {isDropdownOpen && (
              <div className='absolute right-0 w-[264] px-3 py-4 bg-white border border-[#E0E0E0] rounded-[20] z-50 overflow-hidden space-y-2'>
                <div className='rounded-[20] px-3 py-4 text-[#828282] flex gap-2 items-center border border-[#E0E0E0]'>
                  <Search size={20} className='shrink-0 text-[#828282] ' />
                  <input 
                    placeholder='Search'
                    className='outline-none bg-transparent flex-1 text-sm text-[#828282] placeholder:text-[#828282]'
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className='max-h-[240] overflow-y-auto'>
                  {filteredCryptoCurrencies.length > 0 ? (
                    filteredCryptoCurrencies.map((crypto) => (
                      <button
                        key={crypto.id}
                        type="button"
                        onClick={() => {
                          onCryptoChange(crypto.id);
                          setIsDropdownOpen(false);
                        }}
                        className={`w-full flex items-center gap-2 p-3 rounded-[12] hover:bg-[#F5F5F5] transition-colors ${
                          crypto.id === selectedCrypto ? 'bg-[#F5F5F5]' : ''
                        }`}
                      >
                        <Image 
                          src={crypto.logo}
                          width={20}
                          height={20}
                          alt={`${crypto.label} logo`}
                          className='rounded-full'
                        />
                        <span className='text-sm font-medium text-green'>
                          {crypto.label}
                        </span>
                        {crypto.id === selectedCrypto && (
                          <span className='ml-auto text-green'>✓</span>
                        )}
                      </button>
                    ))
                  ) : (
                    <div className='text-center py-4 text-sm text-[#828282]'>
                      No results found
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
};

  
export default AmountInput