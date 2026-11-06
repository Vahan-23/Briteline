import { MessageCircle } from "lucide-react";
import { whatsappHref } from "@/content/site";
import { getMessages } from "@/i18n/messages";
import type { Locale } from "@/i18n/locales";

export function WhatsAppButton({ locale }: { locale: Locale }) {
  const messages = getMessages(locale);
  return (
    <a
      href={whatsappHref(messages.whatsapp.message)}
      target="_blank"
      rel="noopener noreferrer"
      data-whatsapp=""
      className="focus-white fixed right-4 bottom-4 z-30 inline-flex h-14 items-center gap-2 bg-[#128C7E] px-4 text-sm font-medium text-white shadow-[0_8px_24px_rgba(1,42,85,0.18)] hover:bg-[#0E7468] sm:right-6 sm:bottom-6"
    >
      <MessageCircle aria-hidden="true" />
      <span>{messages.whatsapp.label}</span>
    </a>
  );
}
