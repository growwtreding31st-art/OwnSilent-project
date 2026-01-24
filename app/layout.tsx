import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

// === Providers ===
import  ReduxProvider  from "@/lib/redux/ReduxProvider"
import { LanguageProvider } from "@/context/LanguageContext"
import { CurrencyProvider } from "@/context/CurrencyContext"

// === UI Components ===
import ConditionalLayout from "@/components/ConditionalLayout"
import { Toaster } from "react-hot-toast"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    default: "OwnSilent - Auto Parts & Accessories",
    template: "%s | OwnSilent"
  },
  description: "Premium Auto Parts & Accessories Marketplace. Find high-quality parts for your vehicle with OwnSilent.",
  keywords: ["auto parts", "car accessories", "OwnSilent", "premium parts"],
  authors: [{ name: "OwnSilent Team" }],
  viewport: "width=device-width, initial-scale=1",
  robots: "index, follow",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} overflow-x-hidden`}>
        {/* 1. Redux Provider (Sabse Bahar) */}
        <ReduxProvider>
          
          {/* 2. Language Provider */}
          <LanguageProvider>
            
            {/* 3. Currency Provider */}
            <CurrencyProvider>
              
              <Toaster position="top-center" reverseOrder={false} />
              
              {/* 4. Aapka Layout Logic (Header/Footer control) */}
              <ConditionalLayout>
                {children}
              </ConditionalLayout>
              
            </CurrencyProvider>
          </LanguageProvider>
          
        </ReduxProvider>
      </body>
    </html>
  )
}