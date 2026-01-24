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
  title: "OwnSilent - Auto Parts & Accessories",
  description: "Your one-stop shop for premium auto parts and accessories.",
  verification: {
    google: "5w-CgaXCySEQhYiSv5c6ylMOLtOt7UC-75zVu5dbTX8",
  },
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