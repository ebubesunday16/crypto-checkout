import images from '@/assets';
import { ChevronDown } from 'lucide-react'
import Image from 'next/image';
import React from 'react'

interface WalletSelectorType {
    label: string
    selectedWallet: string
    onWalletChange: React.Dispatch<React.SetStateAction<string>>
}

const WALLETS = [
  {id: 'metamask', label: 'Metamask', logo: images.wallets.MetaMask},
  {id: 'rainbow', label: 'Rainbow', logo: images.wallets.Rainbow},
  {id: 'wallet_connect', label: 'WalletConnect', logo: images.wallets.WalletConnect},
  {id: 'other', label: 'Other Crypto Wallets (Binance, Conibase, Bybit etc)', logo: images.wallets.Others},
];

const WalletSelector = ({ 
  label, 
  selectedWallet,
  onWalletChange
}: WalletSelectorType) => {
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  const currentWallet = WALLETS.find(w => w.id === selectedWallet);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className='space-y-3 text-green'>
        <p className='text-sm font-medium'>{label}</p>
        <div className='relative' ref={dropdownRef}>
          <button
            type="button"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className='w-full border border-[#E0E0E0] rounded-[24] px-5 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors'
          >
            {currentWallet ? (
              <div className='flex items-center gap-2'>
                <Image 
                  src={currentWallet.logo}
                  width={24}
                  height={24}
                  alt={`${currentWallet.label} logo`}
                  className='rounded-full'
                />
                <span className='text-sm text-gray-900'>{currentWallet.label}</span>
              </div>
            ) : (
              <p className='text-sm text-[#828282]'>Select an option</p>
            )}
            <ChevronDown     
              className={`text-green transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
              strokeWidth={1.4}
              size={20}
            />
          </button>

          {/* Dropdown menu */}
          {isDropdownOpen && (
            <div className='absolute top-full mt-2 left-2 right-2 bg-white border border-[#E0E0E0] rounded-[20] z-50 overflow-hidden py-4 px-3 shadow-lg'>
              {WALLETS.map((wallet) => (
                <button
                  key={wallet.id}
                  type="button"
                  onClick={() => {
                    onWalletChange(wallet.id);
                    setIsDropdownOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-[12] hover:bg-[#F5F5F5] transition-colors ${
                    wallet.id === selectedWallet ? 'bg-[#F5F5F5]' : ''
                  }`}
                >
                  <Image 
                    src={wallet.logo}
                    width={24}
                    height={24}
                    alt={`${wallet.label} logo`}
                    className='rounded-full shrink-0'
                  />
                  <span className='text-sm font-medium text-gray-900 text-left flex-1'>
                    {wallet.label}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>
    </div>
  )
}

export default WalletSelector