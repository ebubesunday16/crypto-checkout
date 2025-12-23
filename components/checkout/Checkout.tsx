'use client'

import { useConversion } from '@/hooks/useConversion';
import useEmail from '@/hooks/useEmail';
import React, { createContext, useContext, useState } from 'react'


export type TransferType  = 'crypto-to-cash' | 'cash-to-crypto' | 'crypto-to-fiat-loan'

type ConversionContext = ReturnType<typeof useConversion>
type EmailContext = ReturnType<typeof useEmail>


type CheckoutContextValue = {
    selectedTransferType: TransferType,
    setSelectedTransferType: React.Dispatch<React.SetStateAction<TransferType>>

} & ConversionContext & EmailContext

const CheckoutContext = createContext <CheckoutContextValue>({})


const Checkout = ({ children }: { children: React.ReactNode;}) => {
    const [ selectedTransferType, setSelectedTransferType ] = useState<TransferType>('crypto-to-cash')

    const conversionObjects = useConversion()
    const emailObjects = useEmail({label: selectedTransferType})

    const value = {
        selectedTransferType,
        setSelectedTransferType,
        ...conversionObjects,
        ...emailObjects
    }

  return (
    <CheckoutContext.Provider
        value={value}
        >
            <div className='
            bg-white 
            border border-[#CCF6E5] 
            w-[80vh] max-w-[640]  
            h-[758] max-h-[640] sm:max-h-[95vh]
            rounded-[20]
            flex flex-col  items-center 
            py-8
            px-4 sm:px-0 
            text-black
            space-y-8
            '>

                {children}
            </div>
    </CheckoutContext.Provider>
    
  )
}

export const useCheckoutContext = () => {
    return useContext(CheckoutContext)
}

export default Checkout