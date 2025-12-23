'use client'

import React from 'react'
import AmountInput from './utility/AmountInput'
import WalletSelector from './utility/WalletSelector'
import { useCheckoutContext } from './Checkout';

const CryptoToCash = ({ when }: {when: string} ) => {
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
      selectedTransferType,
      setSelectedTransferType,

      } = useCheckoutContext();


  return (
    <>
    <div  className='space-y-4 w-full max-w-md flex-1'>
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
  )
}

export default CryptoToCash