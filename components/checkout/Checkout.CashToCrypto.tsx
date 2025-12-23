'use client'

import React from 'react'
import { useCheckoutContext } from './Checkout'

const CashToCrypto = ({ when }: {when: string}) => {

    const { handleEmailSubmit, setEmail, email} = useCheckoutContext()

  return (
    <div className='flex flex-col items-center justify-center space-y-6 w-full max-w-md text-center  my-auto'>
          <div className='space-y-3'>
            <h2 className='text-3xl font-medium text-green font-clashdisplay'>Coming Soon!</h2>
            <p className='text-sm sm:text-base text-[#4F4F4F]'>
            Cash to Crypto is almost here. <br />Enter your email and we'll let you know the moment it's live.
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
  )
}

export default CashToCrypto