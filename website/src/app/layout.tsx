import type { Metadata } from "next";
import "./globals.css";

import {
  PublicNavbar,
  PublicFooter,
  PublicFloatingWhatsApp,
} from "@/components/layout/PublicChrome";

export const metadata: Metadata = {
  metadataBase: new URL("https://sman1tarik.type3core.my.id"),
  title: {
    default: "SMAN 1 Tarik | Unggul Prestasi, Luhur Budi Pekerti",
    template: "%s | SMAN 1 Tarik",
  },
  description:
    "Website SMA Negeri 1 Tarik Sidoarjo. Informasi profil sekolah, prestasi siswa, kurikulum akademik, fasilitas, agenda kegiatan, dan panduan pendaftaran PPDB.",
  keywords: [
    "SMAN 1 Tarik",
    "SMA Negeri 1 Tarik",
    "SMAN 1 Tarik Sidoarjo",
    "Sekolah Menengah Atas Sidoarjo",
    "PPDB SMAN 1 Tarik",
    "Kurikulum Merdeka Sidoarjo",
    "SMA Negeri Sidoarjo",
  ],
  authors: [{ name: "SMA Negeri 1 Tarik" }],
  creator: "SMA Negeri 1 Tarik",
  publisher: "SMA Negeri 1 Tarik",
  alternates: {
    canonical: "https://sman1tarik.type3core.my.id",
  },
  openGraph: {
    title: "SMAN 1 Tarik | Unggul Prestasi, Luhur Budi Pekerti",
    description:
      "Website SMA Negeri 1 Tarik Sidoarjo. Informasi profil sekolah, prestasi siswa, kurikulum akademik, fasilitas, agenda kegiatan, dan panduan pendaftaran PPDB.",
    url: "https://sman1tarik.type3core.my.id",
    siteName: "SMA Negeri 1 Tarik",
    locale: "id_ID",
    type: "website",
    images: [
      {
        url: "/images/logo.png",
        width: 196,
        height: 196,
        alt: "Logo SMA Negeri 1 Tarik Sidoarjo",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "SMAN 1 Tarik | Unggul Prestasi, Luhur Budi Pekerti",
    description:
      "Website SMA Negeri 1 Tarik Sidoarjo. Informasi profil sekolah, prestasi siswa, kurikulum akademik, fasilitas, agenda kegiatan, dan panduan pendaftaran PPDB.",
    images: ["/images/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="id" className="h-full antialiased">
      <body className="min-h-full flex flex-col font-sans">
        <PublicNavbar />
        <main className="flex-1">{children}</main>
        <PublicFooter />
        <PublicFloatingWhatsApp />
      </body>
    </html>
  );
}
