import "./globals.css";
import { Metadata } from "next";
import { Header } from "@/components/header";
import { AuthContextProvider } from "./provider/AuthProvider";

export const metadata: Metadata = {
  title: "Firebase Authentication",
  description: "Protected route in next js 13.4 with firebase authentication",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthContextProvider>
          <Header />
          {children}
        </AuthContextProvider>
      </body>
    </html>
  );
}
