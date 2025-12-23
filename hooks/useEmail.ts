import React, { useState } from 'react'
import { toast } from 'sonner';

const useEmail = ({ label }: {
    label: string,
}) => {

    const [email, setEmail] = useState('');


    const handleEmailSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        toast.success(`Thanks! We'll notify ${email} when ${label === 'cash-to-crypto' ? 'Cash to Crypto' : 'Crypto to Fiat Loan'} is available.`)
        setEmail('');
      };

  return {
    handleEmailSubmit,
    setEmail,
    email
  }
}

export default useEmail