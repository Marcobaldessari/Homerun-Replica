import React from 'react';
import { MastercardIcon } from './icons/MastercardIcon';
import { VisaIcon } from './icons/VisaIcon';
import { AmexIcon } from './icons/AmexIcon';
interface PaymentInfoCardProps {
  title?: string;
  description?: string;
  className?: string;
  'data-id'?: string;
}
export function PaymentInfoCard({
  title = 'Kredi kartı neden gerekli?',
  description = 'Ödemeni alarak rezervasyonunu onaylıyoruz ve iş bitiminde hizmet verenin hesabına aktarıyoruz. Hizmet gerçekleşmezse ödemeni kartına iade ediyoruz.',
  className = '',
  'data-id': dataId
}: PaymentInfoCardProps) {
  return <div data-id={dataId} className={`bg-gray-50 rounded-lg mx-6 space-y-3 font-figtree ${className}`}>
      <div className="flex flex-col">
        <h3 className="text-sm font-semibold text-gray-900 leading-6">
          {title}
        </h3>
        <p className="text-xs font-normal text-gray-700 leading-4">
          {description}
        </p>
      </div>
      <div className="flex gap-4 items-center">
        <MastercardIcon />
        <VisaIcon />
        <AmexIcon />
      </div>
    </div>;
}