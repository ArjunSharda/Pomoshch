import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
    title: "pomoshch - Help someone in 5 minutes",
    description: "Real people in your community need small favors. Pick one that feels right, help out, feel good.",
}

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <html lang="en" suppressHydrationWarning>
        <body className={inter.className}>
        <ThemeProvider defaultTheme="system">
            {children}
        </ThemeProvider>
        </body>
        </html>
    )
}