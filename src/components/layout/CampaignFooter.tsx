import { Building2, Facebook, Instagram, Linkedin, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { VeleWordmark } from "@/components/ui/VeleWordmark";
import { siteConfig } from "@/config/site";

export function CampaignFooter() {
  const phone = siteConfig.whatsappNumber;
  const socialNetworks = [
    { label: "Instagram", href: siteConfig.social.instagram, icon: Instagram },
    { label: "LinkedIn", href: siteConfig.social.linkedin, icon: Linkedin },
    { label: "Facebook", href: siteConfig.social.facebook, icon: Facebook },
    { label: "WhatsApp", href: phone ? "https://api.whatsapp.com/send/?phone=5511911163133&text&type=phone_number&app_absent=0" : "", icon: MessageCircle },
  ];

  return (
    <footer className="border-t border-zinc-800 bg-black py-10 text-xs text-zinc-300 sm:py-12">
      <Container>
        <div className="grid gap-12 md:grid-cols-[1.25fr_0.75fr_1fr] md:gap-10 lg:gap-20">
          <div>
            <p className="max-w-xs text-sm font-medium leading-5 text-zinc-200">
              Tecnologia, estratégia e engenharia conectadas para impulsionar negócios.
            </p>
            <a href={siteConfig.officialUrl} target="_blank" rel="noreferrer" aria-label="Acessar o site da Vele Tecnologia" className="-mb-10 -mt-10 block w-fit rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-400 sm:-mb-12 sm:-mt-12">
              <VeleWordmark />
            </a>
          </div>

          <div>
            <h2 className="text-xs font-bold tracking-[0.16em] text-amber-400 uppercase">Redes sociais</h2>
            <ul className="mt-4 grid grid-cols-2 gap-2">
              {socialNetworks.map(({ label, href, icon: Icon }) => (
                <li key={label}>
                  {href ? <a href={href} target="_blank" rel="noreferrer" className="group inline-flex w-full items-center justify-center gap-2 rounded-full border border-zinc-700 px-3 py-2 font-medium text-zinc-200 transition duration-300 hover:-translate-y-0.5 hover:border-amber-400 hover:bg-amber-400 hover:text-black"><Icon className="h-3.5 w-3.5" aria-hidden />{label}</a> : <span className="group inline-flex w-full items-center justify-center gap-2 rounded-full border border-zinc-700 px-3 py-2 font-medium text-zinc-300 transition duration-300 hover:-translate-y-0.5 hover:border-amber-400 hover:bg-amber-400 hover:text-black" title={`${label}: URL pendente de configuração`}><Icon className="h-3.5 w-3.5" aria-hidden />{label}</span>}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-xs font-bold tracking-[0.16em] text-amber-400 uppercase">Contato</h2>
            <ul className="mt-4 space-y-3 text-xs leading-5">
              <li>{phone ? <a href="https://api.whatsapp.com/send/?phone=5511911163133&text&type=phone_number&app_absent=0" target="_blank" rel="noreferrer" className="inline-flex items-start gap-3 transition hover:text-amber-400"><Phone className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />+55 11 91116-3133</a> : <span className="inline-flex items-start gap-3 text-zinc-500"><Phone className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />Telefone a configurar</span>}</li>
              <li><a href={`mailto:${siteConfig.contact.email}`} className="inline-flex items-start gap-3 transition hover:text-amber-400"><Mail className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />{siteConfig.contact.email}</a></li>
              <li className="flex items-start gap-3"><MapPin className="mt-0.5 h-4 w-4 shrink-0" aria-hidden /><span className="max-w-56">{siteConfig.contact.address}</span></li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-zinc-700 pt-6 text-xs md:flex md:items-end md:justify-between md:gap-10">
          <div className="space-y-3 font-medium text-zinc-300">
            <p className="flex items-center gap-3"><Building2 className="h-4 w-4" aria-hidden />{siteConfig.contact.legalName}</p>
            <p className="pl-7">{siteConfig.contact.taxId}</p>
          </div>
          <div className="mt-7 flex flex-col gap-3 md:mt-0 md:items-end">
            <div className="flex flex-wrap gap-x-6 gap-y-2 font-medium">
              <a href={`${siteConfig.officialUrl}/politica-de-privacidade`} target="_blank" rel="noreferrer" className="transition hover:text-amber-400">Política de Privacidade</a>
              <a href={`${siteConfig.officialUrl}/termos-de-uso`} target="_blank" rel="noreferrer" className="transition hover:text-amber-400">Termos de Uso</a>
            </div>
            <p>© {new Date().getFullYear()} Vele Tecnologia LTDA. Todos os direitos reservados.</p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
