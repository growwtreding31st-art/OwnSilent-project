import React from "react"

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <main className="pb-1 lg:pt-1 lg:pb-0">
        {children}
      </main>
    </>
  )
}