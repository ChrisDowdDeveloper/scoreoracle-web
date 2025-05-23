import type { Metadata } from "next";
import "./globals.css";
import { UserProvider } from "@/context/UserContext";
import Footer from "@/components/Footer";
import HydratedHeader from "@/components/HydratedHeader";
import { geistMono, geistSans } from "./styles/fonts";

export const metadata: Metadata = {
  title: "Score Oracle",
  description: 'ScoreOracle is a sports prediction platform where users compete by picking game winners, joining groups, and climbing leaderboards. Predict, compete, and win with real-time scores and insights across your favorite leagues.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html 
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body className="bg-white text-[#111827]">
        <UserProvider>
          <HydratedHeader />
            <main className="min-h-screen"> {children} </main>
          <Footer />
        </UserProvider>
      </body>
    </html>
  );
}
