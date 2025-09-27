import React from 'react';
interface ReservationButtonProps {
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  text?: string;
  className?: string;
  'data-id'?: string;
}
export function ReservationButton({
  onClick,
  disabled = false,
  loading = false,
  text = 'Rezervasyonu tamamla',
  className = '',
  'data-id': dataId,
  ...props
}: ReservationButtonProps) {
  return <div className={`w-full bg-white p-6 ${className}`} data-id={dataId}>
      <div className="flex justify-center">
        <button type="submit" onClick={onClick} disabled={disabled || loading} className="
            w-full max-w-lg h-12 
            bg-green-500 hover:bg-green-600 
            border-2 border-green-500 hover:border-green-600
            rounded-lg px-6
            flex items-center justify-center
            transition-colors duration-200
            disabled:opacity-50 disabled:cursor-not-allowed
            focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2
          " {...props}>
          <span className="text-white font-semibold text-base leading-6">
            {loading ? 'Yükleniyor...' : text}
          </span>
        </button>
      </div>
    </div>;
}