import { useState, useEffect } from 'react';
import { convertCrypto } from '@/utility/func';

interface ConversionState {
  payingAmount: string;
  selectedPayingCrypto: string;
  payingWallet: string;
  receivingAmount: string;
  selectedReceivingCrypto: string;
  receivingWallet: string;
  isProcessing: boolean;
}

export const useConversion = () => {
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
      alert('Please fill in all fields');
      return;
    }

    setIsProcessing(true);

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

      // Here you would typically make an API call
      // await api.processConversion(conversionData);

      resetForm();
    } catch (error) {
      console.error('Conversion error:', error);
      alert('Conversion failed. Please try again.');
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