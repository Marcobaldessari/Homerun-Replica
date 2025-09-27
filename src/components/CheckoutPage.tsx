import React, { useState } from 'react';
import { CreditCardForm, CreditCardData } from '../components/CreditCardForm';
import { PaymentInfoCard } from '../components/PaymentInfoCard';
import { ConsentAgreement } from '../components/ConsentAgreement';
import { ReservationButton } from '../components/ReservationButton';
import { HeaderNavigation } from '../components/HeaderNavigation';
import { ProgressBar } from '../components/ProgressBar';
export function CheckoutPage() {
  const [loading, setLoading] = useState(false);
  const handleSubmit = (data: CreditCardData) => {
    setLoading(true);
    // Simulate form submission
    setTimeout(() => {
      setLoading(false);
      console.log('Form submitted:', data);
    }, 2000);
  };
  return <div className="bg-white w-full h-screen flex flex-col relative">
      {/* Status Bar */}
      <div className="h-11 px-5 flex justify-between items-center">
        <div className="text-[#0e0f11] text-[15px] font-semibold">9:27</div>
        <div className="flex items-center gap-1">
          <div className="h-3 w-4">
            <img src="/4f8ee515cebec2e613b0b847652c592b0a133752.svg" alt="" className="h-full w-full" />
          </div>
          <div className="h-3 w-4">
            <img src="/527de27c4852219e49da5cd2826c58bf3607e981.svg" alt="" className="h-full w-full" />
          </div>
          <div className="h-3 w-6">
            <img src="/69c220911ddecdabf0dce8dbee2ee74f34876b50.svg" alt="" className="h-full w-full" />
          </div>
        </div>
      </div>
      {/* Header */}
      <HeaderNavigation title="House cleaning" showBackButton={true} showCloseButton={true} />
      {/* Progress Bar */}
      <div className="bg-white py-1 flex justify-center">
        <ProgressBar value={30} max={100} backgroundColor="bg-[#c6f1d1]" progressColor="bg-[#2cb34f]" height="sm" className="w-40" />
      </div>
      {/* Booking Details */}
      <div className="border-b border-[#e3e5e8] shadow-sm">
        <div className="px-6 py-2 flex justify-between items-start">
          <div className="flex flex-col gap-1">
            <div className="flex gap-1 items-start">
              <span className="text-[#6a7482] text-xs font-normal whitespace-nowrap">
                Details:
              </span>
              <span className="text-[#6a7482] text-xs font-semibold">
                4 hours every 2 weeks
              </span>
            </div>
            <div className="flex gap-1 items-start">
              <span className="text-[#6a7482] text-xs font-normal whitespace-nowrap">
                When:
              </span>
              <span className="text-[#6a7482] text-xs font-semibold">
                Fri 12 Apr - 9:00
              </span>
            </div>
          </div>
          <div className="text-[#6a7482] text-xl font-semibold">3.150 TL</div>
        </div>
      </div>
      {/* Credit Card Form Section */}
      <div className="px-6 pt-6 pb-0 flex-1 overflow-y-auto">
        <h2 className="text-[#0e0f11] text-xl font-semibold mb-2">
          Credit Card information
        </h2>
        <div className="px-0 mb-0">
          <CreditCardForm onSubmit={handleSubmit} />
        </div>
        {/* Payment Info Section */}
        <PaymentInfoCard title="Why is a credit card necessary?" description="We receive your payment and transfer it to the service provider's account when the reservation is completed. If the service is not completed, we refund your payment to your card." />
      </div>
      {/* Footer with Terms and Button */}
      <div className="mt-0 bg-white">
        <div className="border-t border-[#e3e5e8] pt-0 pb-0 px-6 flex flex-col gap-0">
          <ConsentAgreement content={{
          prefix: 'By continuing, I accept the ',
          preInfoText: 'Preliminary Information Form',
          connector: ' and the ',
          salesAgreementText: 'Distance Sales Agreement',
          suffix: ' and approve its terms.'
        }} />
          <ReservationButton text="Complete your reservation" loading={loading} onClick={() => handleSubmit({
          cardNumber: '',
          expiryDate: '',
          cvc: '',
          saveCardInfo: false
        })} />
        </div>
        {/* Home Indicator */}
        <div className="h-[34px] relative w-full flex justify-center">
          <div className="absolute bottom-2 bg-black h-[5px] rounded-full w-[134px]"></div>
        </div>
      </div>
    </div>;
}