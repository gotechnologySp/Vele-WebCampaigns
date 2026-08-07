import { Instagram, Linkedin, MessageCircle, Youtube } from "lucide-react";
import { siteConfig } from "@/config/site";

const networks = [
  { label: "Instagram", href: siteConfig.social.instagram, icon: Instagram },
  { label: "LinkedIn", href: siteConfig.social.linkedin, icon: Linkedin },
  { label: "YouTube", href: siteConfig.social.youtube, icon: Youtube },
  { label: "WhatsApp", href: siteConfig.whatsappNumber ? "https://api.whatsapp.com/send/?phone=5511911163133&text&type=phone_number&app_absent=0" : "", icon: MessageCircle },
] as const;

export function SocialLinks() {
  return (
    <div className="mt-9 border-t border-zinc-600 pt-7">
      <p className="mb-4 text-xs font-semibold tracking-[0.16em] text-zinc-300 uppercase">
        Acompanhe a Vele
      </p>
      <div className="flex flex-wrap gap-3">
        {networks.map(({ label, href, icon: Icon }) =>
          href ? (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              aria-label={`Vele no ${label}`}
              className="group inline-flex items-center gap-2 rounded-full border border-zinc-500 bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition duration-300 hover:-translate-y-0.5 hover:border-amber-400 hover:bg-amber-400 hover:text-black hover:shadow-lg hover:shadow-amber-400/20 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-400"
            >
              <Icon className="h-4 w-4 text-amber-400 transition-colors group-hover:text-black" aria-hidden />
              {label}
            </a>
          ) : (
            <span
              key={label}
              title={`${label}: URL pendente de configuração`}
              className="group inline-flex items-center gap-2 rounded-full border border-zinc-500 bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition duration-300 hover:-translate-y-0.5 hover:border-amber-400 hover:bg-amber-400 hover:text-black hover:shadow-lg hover:shadow-amber-400/20"
              aria-disabled="true"
            >
              <Icon className="h-4 w-4 text-amber-400 transition-colors group-hover:text-black" aria-hidden />
              {label}
            </span>
          ),
        )}
      </div>
    </div>
  );
}
