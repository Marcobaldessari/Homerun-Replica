import React, { useState } from 'react';
import { CreditCardIcon } from './CreditCardIcon';
interface CreditCardFormProps {
  onSubmit?: (data: CreditCardData) => void;
  className?: string;
  'data-id'?: string;
}
interface CreditCardData {
  cardNumber: string;
  expiryDate: string;
  cvc: string;
  saveCardInfo: boolean;
}
export const CreditCardForm: React.FC<CreditCardFormProps> = ({
  onSubmit,
  className = '',
  'data-id': dataId
}) => {
  const [formData, setFormData] = useState<CreditCardData>({
    cardNumber: '',
    expiryDate: '',
    cvc: '',
    saveCardInfo: false
  });
  const handleInputChange = (field: keyof CreditCardData) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = field === 'saveCardInfo' ? e.target.checked : e.target.value;
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };
  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };
  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\D/g, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };
  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCardNumber(e.target.value);
    setFormData(prev => ({
      ...prev,
      cardNumber: formatted
    }));
  };
  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatExpiryDate(e.target.value);
    setFormData(prev => ({
      ...prev,
      expiryDate: formatted
    }));
  };
  const handleCvcChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').substring(0, 4);
    setFormData(prev => ({
      ...prev,
      cvc: value
    }));
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.(formData);
  };
  return <div className={`w-full max-w-lg bg-white p-6 space-y-4 ${className}`} data-id={dataId}>
        {/* Card Number */}
        <div className="space-y-1">
          <label htmlFor="cardNumber" className="block text-sm font-semibold text-gray-900">
            Kart numarası
          </label>
          <div className="relative">
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
              <CreditCardIcon className="w-6 h-6" />
            </div>
            <input id="cardNumber" name="cardNumber" type="text" value={formData.cardNumber} onChange={handleCardNumberChange} placeholder="1542 0545 0658 0789" autoComplete="cc-number" className="w-full h-14 pl-14 pr-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors" maxLength={19} />
          </div>
        </div>
        {/* Expiry Date and CVC */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <label htmlFor="expiryDate" className="block text-sm font-semibold text-gray-900">
              Son kullanma tarihi
            </label>
            <input id="expiryDate" name="expiryDate" type="text" value={formData.expiryDate} onChange={handleExpiryChange} placeholder="01/30" className="w-full h-14 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors" maxLength={5} />
          </div>
          <div className="space-y-1">
            <label htmlFor="cvc" className="block text-sm font-semibold text-gray-900">
              CVC
            </label>
            <input id="cvc" name="cvc" type="text" value={formData.cvc} onChange={handleCvcChange} placeholder="123" autoComplete="cc-csc" className="w-full h-14 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors" maxLength={4} />
          </div>
        </div>
        {/* Save Card Info Checkbox */}
        <div className="flex items-center space-x-3">
          <div className="relative">
            <input id="saveCardInfo" name="saveCardInfo" type="checkbox" checked={formData.saveCardInfo} onChange={handleInputChange('saveCardInfo')} className="w-6 h-6 accent-green-600 border-gray-300 rounded" />
          </div>
          <label htmlFor="saveCardInfo" className="text-sm text-gray-700 cursor-pointer select-none">
            Kredi kartı bilgilerimin güvenli bir şekilde saklanmasına izin
            veriyorum.
          </label>
        </div>
    </div>;
};