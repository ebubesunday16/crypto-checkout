'use client'

import React from 'react'
import { motion } from 'motion/react';
import { useCheckoutContext } from './Checkout';

const PAYMENT_TYPES = [
    {id: 'crypto-to-cash', label: 'Crypto to cash'},
    {id: 'cash-to-crypto', label: 'Cash to crypto'},
    {id: 'crypto-to-fiat-loan', label: 'Crypto to fiat loan'},
  ];

const TransferType = () => {
    const { selectedTransferType, setSelectedTransferType } = useCheckoutContext();

  return (
    
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
  )
}

export default TransferType