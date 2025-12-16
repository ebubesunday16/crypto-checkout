'use client'
import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import images from '@/assets';
import AmountInput from '../utility/AmountInput';
import WalletSelector from '../utility/WalletSelector';
import { convertCrypto } from '@/utility/func';

const PAYMENT_TYPES = [
  {id: 'crypto-to-cash', label: 'Crypto to cash'},
  {id: 'cash-to-crypto', label: 'Cash to crypto'},
  {id: 'crypto-to-fiat-loan', label: 'Crypto to fiat loan'},
];

const CheckoutScreen = () => {
  const [selectedTransferType, setSelectedTransferType] = useState('crypto-to-cash');
  const [payingAmount, setPayingAmount] = useState('');
  const [selectedPayingCrypto, setSelectedPayingCrypto] = useState('eth');
  const [payingWallet, setPayingWallet] = useState('');
  const [receivingWallet, setReceivingWallet] = useState('');
  const [receivingAmount, setReceivingAmount] = useState('');
  const [selectedReceivingCrypto, setSelectedReceivingCrypto] = useState('usdt-cello');
  const [isProcessing, setIsProcessing] = useState(false);
  const [lastEditedField, setLastEditedField] = useState<'paying' | 'receiving'>('paying');


  console.log('data is', payingAmount, selectedPayingCrypto, payingWallet, receivingWallet, receivingAmount, selectedReceivingCrypto, )

  // Auto-convert when paying amount or cryptos change
  useEffect(() => {
    if (lastEditedField === 'paying' && payingAmount && selectedPayingCrypto && selectedReceivingCrypto) {
      const converted = convertCrypto(
        payingAmount,
        selectedPayingCrypto,
        selectedReceivingCrypto
      );
      setReceivingAmount(converted);
    } else if (lastEditedField === 'paying' && !payingAmount) {
      setReceivingAmount('');
    }
  }, [payingAmount, selectedPayingCrypto, selectedReceivingCrypto, lastEditedField]);

  // Auto-convert when receiving amount or cryptos change
  useEffect(() => {
    if (lastEditedField === 'receiving' && receivingAmount && selectedPayingCrypto && selectedReceivingCrypto) {
      const converted = convertCrypto(
        receivingAmount,
        selectedReceivingCrypto,
        selectedPayingCrypto
      );
      setPayingAmount(converted);
    } else if (lastEditedField === 'receiving' && !receivingAmount) {
      setPayingAmount('');
    }
  }, [receivingAmount, selectedPayingCrypto, selectedReceivingCrypto, lastEditedField]);

  const handlePayingAmountChange = (value: string) => {
    setLastEditedField('paying');
    setPayingAmount(value);
  };

  const handleReceivingAmountChange = (value: string) => {
    setLastEditedField('receiving');
    setReceivingAmount(value);
  };

  const isFormValid = 
    payingAmount && 
    selectedPayingCrypto && 
    payingWallet && 
    receivingAmount && 
    selectedReceivingCrypto && 
    receivingWallet;

  const handleConvert = async () => {
    if (!isFormValid) {
      alert('Please fill in all fields');
      return;
    }

    setIsProcessing(true);

    try {
      const conversionData = {
        transferType: selectedTransferType,
        paying: {
          amount: payingAmount,
          crypto: selectedPayingCrypto,
          wallet: payingWallet,
        },
        receiving: {
          amount: receivingAmount,
          crypto: selectedReceivingCrypto,
          wallet: receivingWallet,
        },
        timestamp: new Date().toISOString(),
      };

      console.log('Processing conversion:', conversionData);

      // Reset form
      setPayingAmount('');
      setSelectedPayingCrypto('eth');
      setPayingWallet('');
      setReceivingAmount('');
      setSelectedReceivingCrypto('usdt-cello');
      setReceivingWallet('');
      setLastEditedField('paying');

    } catch (error) {
      console.error('Conversion error:', error);
      alert('Conversion failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

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
      '
    >
      <div className='bg-[#f2f2f2] rounded-[24] flex relative '>
        {PAYMENT_TYPES.map((item) => (
          <div
            key={item.id}
            onClick={() => setSelectedTransferType(item.id)}
            className='relative z-10 rounded-[24] px-4 py-2 cursor-pointer'
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
              text-xs  font-medium select-none whitespace-nowrap relative z-10 transition-colors duration-200
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
      
        <button 
          onClick={handleConvert}
          disabled={!isFormValid || isProcessing}
          className={`
            rounded-[24] py-3 w-full font-medium
            transition-all duration-200 bg-green text-[#E6FBF2] hover:bg-green/90 
            ${isFormValid && !isProcessing
              ? 'cursor-pointer' 
              : ' cursor-not-allowed'
            }
          `}
        >
          {isProcessing ? 'Processing...' : 'Convert now'}
        </button>
      </div>
      
    </div>
  );
};

export default CheckoutScreen;