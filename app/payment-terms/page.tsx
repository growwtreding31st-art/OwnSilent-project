export default function PaymentTermsPage() {
  return (
    <div className="min-h-screen bg-gray-50 px-6 py-12">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-12 text-gray-800">
          Payment Terms
        </h1>

        <div className="bg-white rounded-xl shadow-md p-6 mb-8 border border-gray-200">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">
            Introduction
          </h2>
          <p className="text-gray-600 mb-2">
            At Own Silent International Limited, we strive to provide a smooth and secure payment process for all our customers.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 mb-8 border border-gray-200">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">
            Accepted Payment Methods
          </h2>
          <ul className="list-disc pl-6 text-gray-600 space-y-2">
            <li>Credit Cards (Visa, MasterCard, American Express)</li>
            <li>Debit Cards</li>
            <li>PayPal</li>
            <li>Bank Transfers</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
