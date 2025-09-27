import React from 'react';
interface ConsentAgreementProps {
  /** Optional data-id for component identification */
  'data-id'?: string;
  /** URL for the pre-information form */
  preInfoUrl?: string;
  /** URL for the distance sales agreement */
  salesAgreementUrl?: string;
  /** Custom text content - if not provided, uses default Turkish text */
  content?: {
    prefix?: string;
    preInfoText?: string;
    connector?: string;
    salesAgreementText?: string;
    suffix?: string;
  };
  /** Custom styling classes */
  className?: string;
}
export function ConsentAgreement({
  'data-id': dataId,
  preInfoUrl = '#',
  salesAgreementUrl = '#',
  content = {
    prefix: 'Devam ederek ',
    preInfoText: 'Ön Bilgilendirme Formu',
    connector: 've ',
    salesAgreementText: 'Mesafeli Satış Sözleşmesi',
    suffix: "'ni kabul ediyor ve şartlarını onaylıyorum."
  },
  className = ''
}: ConsentAgreementProps) {
  return <div data-id={dataId} className={`w-full max-w-[518px] bg-white px-6 pt-4 ${className}`} style={{
    fontFamily: 'Figtree, Cairo, system-ui, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"'
  }}>
      <div className="text-center text-xs leading-4 text-gray-900">
        <span className="font-normal">{content.prefix}</span>
        <a href={preInfoUrl} className="font-semibold text-gray-900 underline hover:opacity-80 transition-opacity">
          {content.preInfoText}
        </a>
        <span className="font-normal"> {content.connector}</span>
        <a href={salesAgreementUrl} className="font-semibold text-gray-900 underline hover:opacity-80 transition-opacity">
          {content.salesAgreementText}
        </a>
        <span className="font-normal">{content.suffix}</span>
      </div>
    </div>;
}