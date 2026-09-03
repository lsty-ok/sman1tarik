import { MessageCircle } from "lucide-react";

import { siteInfo } from "@/data/siteData";

export default function FloatingWhatsApp() {
  const message = encodeURIComponent(
    `Halo, saya ingin mendapatkan informasi mengenai PPDB SMAN 1 Tarik.`
  );
  const href = `https://wa.me/${siteInfo.whatsapp}?text=${message}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat via WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full bg-green-500 p-4 text-white shadow-lg transition-all hover:bg-green-600 hover:shadow-xl"
    >
      <MessageCircle size={24} />
      <span className="hidden md:inline font-semibold">Tanya PPDB</span>
    </a>
  );
}
