'use client'
import React, { ReactNode } from 'react'
import { useCheckoutContext } from './Checkout';

export type CheckoutViewProps = {
  when: string;
  children?: React.ReactNode;
};


const Body = ({ children }: {children: ReactNode}) => {

  const { selectedTransferType } = useCheckoutContext();

  const childArray = React.Children.toArray(children) as React.ReactElement<CheckoutViewProps>[];

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