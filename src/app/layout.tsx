import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "@mui/material-pigment-css/styles.css";
import Providers from "@/lib/providers/queryProvider";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
  variable: "--font-roboto",
});

export const metadata: Metadata = {
  title: "Image Library | Professional Image Management System",
  description:
    "Efficiently manage, categorize, and organize your digital images. Features include category management, image uploads, filtering, and intuitive organization tools",
  keywords:
    "digital asset management, image organization, photo management, media library, image categorization",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${roboto.variable}`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
