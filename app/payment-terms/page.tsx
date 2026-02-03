import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Payment Terms - Own Silent International Limited",
  description:
    "Learn about the payment terms for Own Silent International Limited. We accept credit cards, debit cards, PayPal, and bank transfers. Customer is responsible for any transaction charges.",
  keywords: [
    "Own Silent International Limited",
    "Payment terms",
    "Credit card payment",
    "Debit card payment",
    "PayPal",
    "Bank transfer",
    "Transaction charges",
    "Luxury car tuning parts",
  ],
  alternates: {
    canonical: "https://ownsilent.international/payment-terms",
  },
};

export default function PaymentTermsPage() {
  return (
    <div className="min-h-screen px-6 py-12 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Payment Terms</h1>

      <p className="mb-4">
        At Own Silent International Limited, we strive to provide a smooth and secure payment process for all our customers.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-3">Accepted Payment Methods</h2>
      <ul className="list-disc pl-5 mb-4">
        <li>Credit Cards (Visa, MasterCard, American Express)</li>
        <li>Debit Cards</li>
        <li>PayPal</li>
        <li>Bank Transfers</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6 mb-3">Transaction Charges</h2>
      <p className="mb-4">
        Customers are responsible for any transaction charges or bank fees incurred during the payment process.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-3">Payment Confirmation</h2>
      <p>
        Once your payment is successfully processed, you will receive an email confirmation with your order details. Orders will be processed and shipped only after payment confirmation.
      </p>
    </div>
  );
}
