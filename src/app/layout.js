import { Outfit } from "next/font/google";
import RoleSwitcher from "../components/RoleSwitcher";
import "./globals.css";

const outfit = Outfit({ subsets: ["latin"], weight: ["300","400","500","600","700","800","900"] });

export const metadata = {
  title: "AFSWITCH — Digital Financial Network for Afghanistan",
  description: "Investor demo showcasing Admin, Agent, and User views of the AFSWITCH platform.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={outfit.className}>
        <RoleSwitcher />
        <main style={{ paddingTop: 56 }}>{children}</main>
      </body>
    </html>
  );
}
