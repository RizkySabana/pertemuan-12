
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { TemaProvider } from "@/context/TemaContext";

const jakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
});

export const metadata = {
  title: {
    default: "Perpustakaan Kelas",
    template: "%s | Perpustakaan Kelas",
  },
  description:
    "Website Perpustakaan Kelas untuk mencari, melihat, dan mengelola koleksi buku.",
  openGraph: {
    title: "Perpustakaan Kelas",
    description:
      "Temukan dan jelajahi berbagai koleksi buku di Perpustakaan Kelas.",
    type: "website",
    locale: "id_ID",
    siteName: "Perpustakaan Kelas",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body className={jakartaSans.className}>
        <TemaProvider>
          {children}
        </TemaProvider>
      </body>
    </html>
  );
}
