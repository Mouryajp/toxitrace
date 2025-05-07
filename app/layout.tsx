import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ChatLayout from "./components/ChatLayout";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "ToxicTrace.AI",
  description: "Your AI Companion for Mental Well-being",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider attribute="class" defaultTheme="light">
          <div className="w-full flex justify-end p-2 h-[10vh]">
            <Header />
          </div>
          <main className="h-[85vh]"> {children}</main>
          <Footer />
          <ChatLayout />
        </ThemeProvider>
      </body>
    </html>
  );
}
