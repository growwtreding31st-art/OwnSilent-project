'use client'
import React from 'react';

const termsContent = [
  {
    title: "1. Acceptance of Terms",
    content: "By accessing our website or purchasing our products, you agree to these Terms. If you do not agree to these Terms, please do not use our website or services.",
  },
  {
    title: "2. Changes to Terms",
    content: "We reserve the right to modify or update these Terms at any time without prior notice. Your continued use of the website after any changes signifies your acceptance of the revised Terms.",
  },
  {
    title: "3. Products and Services",
    list: [
      "Product Descriptions: We strive to ensure that all product descriptions, images, and specifications are accurate. However, we do not guarantee that these details are error-free.",
      "Availability: All products and services are subject to availability. We reserve the right to limit quantities or discontinue any product or service without prior notice.",
      "Pricing: Prices for our products are subject to change without notice. We are not liable for any price changes or discrepancies.",
    ],
  },
  {
    title: "4. Orders and Payments",
    list: [
      "Order Acceptance: We reserve the right to refuse or cancel any order for any reason, including but not limited to product unavailability, errors in pricing, or suspected fraudulent activity.",
      "Payment: All payments must be made at the time of purchase. We accept various payment methods, and you are responsible for providing accurate and complete payment information.",
      "Taxes: You are responsible for any taxes, duties, or other charges applicable to your purchase.",
    ],
  },
  {
    title: "5. Shipping and Delivery",
    list: [
      "Shipping: We offer shipping services worldwide, with delivery times and costs varying depending on your location.",
      "Delivery: We strive to deliver your order within the estimated timeframe; however, we are not responsible for delays caused by external factors such as customs, carrier issues, or natural events.",
      "Risk of Loss: The risk of loss or damage to the products passes to you upon delivery.",
    ],
  },
  {
    title: "6. Returns and Refunds",
    list: [
      "Returns: We accept returns of products within a specified period, provided they are unused, in original packaging, and accompanied by a proof of purchase. Please refer to our Returns & Refunds Policy for more details.",
      "Refunds: Refunds will be processed once the returned item is received and inspected. The refund will be issued to the original payment method, minus any applicable fees.",
    ],
  },
  {
    title: "7. Intellectual Property",
    list: [
      "Ownership: All content on our website, including text, images, logos, and designs, is the intellectual property of Own Silent International Limited or its licensors.",
      "Usage: You may not use, reproduce, or distribute any content without our prior written consent. Unauthorized use may result in legal action.",
    ],
  },
  {
    title: "8. User Conduct",
    content: "You agree not to use our website for any unlawful purpose or in any way that could damage, disable, or impair our services. This includes, but is not limited to, hacking, spreading malware, or attempting to access restricted areas of the website.",
  },
  {
    title: "9. Privacy Policy",
    content: "Your privacy is important to us. Please review our Privacy Policy, which explains how we collect, use, and protect your personal information.",
  },
  {
    title: "10. Limitation of Liability",
    content: "To the fullest extent permitted by law, Own Silent International Limited shall not be liable for any direct, indirect, incidental, or consequential damages arising out of your use of our website or products. Our total liability for any claim related to our services shall not exceed the amount paid for the product or service in question.",
  },
  {
    title: "11. Indemnification",
    content: "You agree to indemnify and hold Own Silent International Limited harmless from any claims, damages, losses, or expenses arising out of your use of our website, your violation of these Terms, or your infringement of any third-party rights.",
  },
  {
    title: "12. Governing Law",
    content: "These Terms shall be governed by and construed in accordance with the laws of [Jurisdiction]. Any disputes arising out of or related to these Terms shall be subject to the exclusive jurisdiction of the courts in [Jurisdiction].",
  },
  {
    title: "13. Severability",
    content: "If any provision of these Terms is found to be invalid or unenforceable, the remaining provisions shall remain in full force and effect.",
  },
  {
    title: "14. Entire Agreement",
    content: "These Terms, along with our Privacy Policy and any other policies referenced herein, constitute the entire agreement between you and Own Silent International Limited and supersede any prior agreements or understandings.",
  },
];


export default function TermsAndConditionsPage() {
  return (
    <main className="bg-white">
      <div className="container mx-auto max-w-4xl px-4 py-12 sm:py-12">

        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-800">
            Terms & Conditions
          </h1>
          <p className="mt-4 text-sm text-gray-500">
            Effective Date: [24-08-2024]
          </p>
        </div>

        <div className="prose prose-lg max-w-none mx-auto text-gray-700">
          <p>
            These Terms & Conditions ("Terms") govern your use of the website and services provided by Own Silent International Limited ("we," "us," or "our"). By accessing or using our website, you agree to be bound by these Terms. Please read them carefully.
          </p>
          
          {termsContent.map((section) => (
            <div key={section.title} className="mt-8">
              <h2 className="text-xl font-bold text-gray-900 mb-3">{section.title}</h2>
              {section.content && <p>{section.content}</p>}
              {section.list && (
                <ul className="list-disc pl-6 mt-3 space-y-2">
                  {section.list.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}

          <div className="mt-12 border-t pt-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">15. Contact Information</h2>
            <p>
              If you have any questions or concerns about these Terms, please contact us at:
            </p>
            <div className="mt-3 space-y-1 not-prose">
              <p><strong>Email:</strong> <a href="mailto:help@ownsilent.com" className="text-blue-600 hover:underline">help@ownsilent.com</a></p>
              <p><strong>Phone:</strong> <a href="tel:+14244540430" className="text-blue-600 hover:underline">+1 (424) 454-0430</a></p>
              <p><strong>Address:</strong> 16192 Coastal Highway, Lewes, Delaware, USA 🇺🇸</p>
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}   