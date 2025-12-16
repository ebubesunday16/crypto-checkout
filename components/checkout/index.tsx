'use client'
import React, { useState } from 'react';
import { motion } from 'motion/react';
import AmountInput from './AmountInput';
import WalletSelector from './WalletSelector';
import { useConversion } from '@/hooks/useConversion'; 

const PAYMENT_TYPES = [
  {id: 'crypto-to-cash', label: 'Crypto to cash'},
  {id: 'cash-to-crypto', label: 'Cash to crypto'},
  {id: 'crypto-to-fiat-loan', label: 'Crypto to fiat loan'},
];

const CheckoutScreen = () => {
  const [selectedTransferType, setSelectedTransferType] = useState('crypto-to-cash');
  
  const {
    payingAmount,
    selectedPayingCrypto,
    payingWallet,
    receivingAmount,
    selectedReceivingCrypto,
    receivingWallet,
    isProcessing,
    isFormValid,
    handlePayingAmountChange,
    handleReceivingAmountChange,
    setSelectedPayingCrypto,
    setPayingWallet,
    setSelectedReceivingCrypto,
    setReceivingWallet,
    handleConvert,
  } = useConversion();

  return (
    <div className='
      bg-white 
      border border-[#CCF6E5] 
      w-[80vh] max-w-[640]  
      h-[758] max-h-[95vh]
      rounded-[20]
      flex flex-col justify-center items-center 
      py-8
      px-4 sm:px-0 
      text-black
      space-y-8
    '>
      <div className='bg-[#f2f2f2] rounded-[24] flex relative'>
        {PAYMENT_TYPES.map((item) => (
          <div
            key={item.id}
            onClick={() => setSelectedTransferType(item.id)}
            className='relative z-10 rounded-[24] py-3 px-2 sm:px-4 sm:py-2 cursor-pointer'
          >
            {selectedTransferType === item.id && (
              <motion.div
                layoutId="activeTab"
                className='absolute inset-0 bg-green rounded-[24]'
                transition={{
                  type: "spring",
                  stiffness: 350,
                  damping: 35,
                }}
              />
            )}
            <p className={`
              text-xs font-medium select-none whitespace-nowrap relative z-10 transition-colors duration-200
              ${selectedTransferType === item.id ? 'text-[#F8FEFB]' : 'text-[#828282]'}
            `}>
              {item.label}
            </p>
          </div>
        ))}
      </div>
      
      <div className='space-y-4 w-full max-w-md'>
        <AmountInput 
          label='You pay'
          value={payingAmount}
          onChange={handlePayingAmountChange}
          placeholder="0.00"
          selectedCrypto={selectedPayingCrypto}
          onCryptoChange={setSelectedPayingCrypto}
        />
        <AmountInput 
          label='You receive'
          value={receivingAmount}
          onChange={handleReceivingAmountChange}
          placeholder="0.00"
          selectedCrypto={selectedReceivingCrypto}
          onCryptoChange={setSelectedReceivingCrypto}
        />
        <WalletSelector 
          label='Pay from'
          selectedWallet={payingWallet}
          onWalletChange={setPayingWallet}
        />
        <WalletSelector 
          label='Pay to'
          selectedWallet={receivingWallet}
          onWalletChange={setReceivingWallet}
        />
      </div>

      <button 
        onClick={() => handleConvert(selectedTransferType)}
        disabled={!isFormValid || isProcessing}
        className={`
          rounded-[24] py-3 w-full font-medium
          transition-all duration-200 bg-green text-[#E6FBF2] hover:bg-green/90 
          max-w-md
          ${isFormValid && !isProcessing
            ? 'cursor-pointer' 
            : 'cursor-not-allowed'
          }
        `}
      >
        {isProcessing ? 'Processing...' : 'Convert now'}
      </button>
    </div>
  );
};

export default CheckoutScreen;