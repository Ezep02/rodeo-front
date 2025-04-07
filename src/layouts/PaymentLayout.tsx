import React from "react";

interface PaymentLayoutProps {
  children: React.ReactNode;
}

const PaymentLayout: React.FC<PaymentLayoutProps> = ({ children }) => {

  return (
    <div
      className="h-screen bg-zinc-100 overflow-hidden"
    >
      <main className="w-full">
        {children}
      </main>
    </div>
  );
};

export default PaymentLayout;
