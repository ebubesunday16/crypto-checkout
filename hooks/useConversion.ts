import { useState, useEffect } from 'react';
import { convertCrypto } from '@/utility/func';
import { toast } from 'sonner';

export interface ConversionContext {
  payingAmount: string
  selectedPayingCrypto: string
  payingWallet: string
  receivingAmount: string
  selectedReceivingCrypto: string
  receivingWallet: string
  isProcessing: boolean
  isFormValid: string
  handlePayingAmountChange: (value: string) => void
  handleReceivingAmountChange: (value: string) => void
  setSelectedPayingCrypto: React.Dispatch<React.SetStateAction<string>>
  setPayingWallet: React.Dispatch<React.SetStateAction<string>>
  setSelectedReceivingCrypto: React.Dispatch<React.SetStateAction<string>>
  setReceivingWallet: React.Dispatch<React.SetStateAction<string>>
  handleConvert: (transferType: string) => Promise<void>
  resetForm: () => void
}

export const useConversion = (): ConversionContext => {
  const [payingAmount, setPayingAmount] = useState('');
  const [selectedPayingCrypto, setSelectedPayingCrypto] = useState('eth');
  const [payingWallet, setPayingWallet] = useState('');
  const [receivingAmount, setReceivingAmount] = useState('');
  const [selectedReceivingCrypto, setSelectedReceivingCrypto] = useState('usdt-cello');
  const [receivingWallet, setReceivingWallet] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [lastEditedField, setLastEditedField] = useState<'paying' | 'receiving'>('paying');

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

  const resetForm = () => {
    setPayingAmount('');
    setSelectedPayingCrypto('eth');
    setPayingWallet('');
    setReceivingAmount('');
    setSelectedReceivingCrypto('usdt-cello');
    setReceivingWallet('');
    setLastEditedField('paying');
  };

  const handleConvert = async (transferType: string) => {
    if (!isFormValid) {
      toast.error('Please fill in all fields to continue');
      return;
    }

    setIsProcessing(true);

    // Show processing toast
    toast.loading(`Converting ${payingAmount} ${selectedPayingCrypto.toUpperCase()} to ${selectedReceivingCrypto.toUpperCase()}...`);

    try {
      const conversionData = {
        transferType,
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
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Here you would typically make an API call
      // await api.processConversion(conversionData);

      // Dismiss loading toast and show success
      toast.dismiss();
      toast.success(`Successfully converted ${payingAmount} ${selectedPayingCrypto.toUpperCase()} to ${receivingAmount} ${selectedReceivingCrypto.toUpperCase()}`);

      resetForm();
    } catch (error) {
      console.error('Conversion error:', error);
      
      // Dismiss loading toast and show error
      toast.dismiss();
      toast.error('Conversion failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return {
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
    resetForm,
  };
};