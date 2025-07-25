import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

import { Manrope } from "next/font/google";
import AppProvider from "@/components/provider/AppProvider";
import AuthProvider from "@/components/provider/AuthProvider";

const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-manrope",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en"> 
    <head>
        <style>{`:root { --primary: ${primaryColor}; }`}</style>
      </head>
      <body className={`${manrope.variable} antialiased`}>
        <AuthProvider>
          <AppProvider>
            {children}
            <Toaster position="top-right"/>
          </AppProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
