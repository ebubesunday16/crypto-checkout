'use client'
import React, { ReactNode } from 'react'
import { useCheckoutContext } from './Checkout';

const Body = ({ children }: {children: ReactNode}) => {

  const { selectedTransferType } = useCheckoutContext();

  const childArray = React.Children.toArray(children) as React.ReactElement[]

  const activeChild = childArray.find((child) => {
    return child.props?.when === selectedTransferType
  })


  return (
    <>
      {activeChild ?? null}
    </>
  )
}

export default Body