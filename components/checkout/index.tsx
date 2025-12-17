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
  const [email, setEmail] = useState('');
  
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

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Thanks! We'll notify ${email} when ${selectedTransferType === 'cash-to-crypto' ? 'Cash to Crypto' : 'Crypto to Fiat Loan'} is available.`);
    setEmail('');
  };

  const getPlaceholderTitle = () => {
    if (selectedTransferType === 'cash-to-crypto') {
      return 'Cash to Crypto';
    }
    return 'Crypto to Fiat Loan';
  };

  return (
    <div className='
      bg-white 
      border border-[#CCF6E5] 
      w-[80vh] max-w-[640]  
      h-[758] max-h-[95vh]
      rounded-[20]
      flex flex-col  items-center 
      py-8
      px-4 sm:px-0 
      text-black
      space-y-8
    '>
      <div className='bg-[#f2f2f2] rounded-[24]  flex relative'>
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
              text-xs sm:text-sm font-medium select-none whitespace-nowrap relative z-10 transition-colors duration-200
              ${selectedTransferType === item.id ? 'text-[#F8FEFB]' : 'text-[#828282]'}
            `}>
              {item.label}
            </p>
          </div>
        ))}
      </div>
      
      {selectedTransferType === 'crypto-to-cash' ? (
        <>
          <div className='space-y-4 w-full max-w-md flex-1'>
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
        </>
      ) : (
        <div className='flex flex-col items-center justify-center space-y-6 w-full max-w-md px-6 text-center  my-auto'>
          <div className='space-y-3'>
            <h2 className='text-3xl font-medium text-green font-clashdisplay'>Coming Soon!</h2>
            <p className='text-sm sm:text-base text-[#4F4F4F]'>
              {getPlaceholderTitle()} is almost here. <br />Enter your email and we'll let you know the moment it's live.
            </p>
              
          </div>
          
          <form onSubmit={handleEmailSubmit} className='w-full space-y-3'>
            <div className='space-y-4'>
              <label htmlFor='email' className='text-sm font-medium text-green block text-left'>
                Email
              </label>
              <input
                id='email'
                type='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder='Enter your email'
                required
                className='
                  w-full px-4 py-3 rounded-[24] border border-[#E0E0E0]
                  text-sm placeholder:text-sm text-[#828282] placeholder:text-[#828282]

                  focus:outline-none focus:border-green focus:ring-1 focus:ring-green
                '
              />
            </div>
            
            <button
              type='submit'
              className='
                w-full py-3 rounded-[24] font-medium
                bg-green text-[#E6FBF2] hover:bg-green/90
                transition-all duration-200 mt-16
              '
            >
              Update me
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default CheckoutScreen;