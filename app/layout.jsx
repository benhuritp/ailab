import { Open_Sans , Inter } from "next/font/google";
import "./globals.scss";

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata = {
  title: "AiLab",
  description: "",
};
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${openSans.variable} ${inter.variable} antialiased font-[family-name:var(--font-open-sans)]`}
      >
        {children}
      </body>
    </html>
  );
}
