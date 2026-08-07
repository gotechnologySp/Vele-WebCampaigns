import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { VeleMark } from "@/components/ui/VeleMark";
import { campaigns } from "@/config/campaigns";
import { siteConfig } from "@/config/site";

export default function Home() {
  const activeCampaigns = Object.values(campaigns).filter(
    (campaign) => campaign.status === "active",
  );

  return (
    <main id="conteudo" className="min-h-svh bg-[#f5f4ef] py-10 sm:py-16">
      <Container>
        <header className="flex items-center justify-between">
          <VeleMark />
          <a
            href={siteConfig.officialUrl}
            className="inline-flex items-center gap-2 text-sm font-semibold hover:underline"
            target="_blank"
            rel="noreferrer"
          >
            Site oficial <ArrowUpRight className="h-4 w-4" />
          </a>
        </header>

        <section className="pb-14 pt-24 sm:pb-20 sm:pt-32">
          <p className="text-sm font-semibold tracking-[0.18em] text-amber-600 uppercase">
            Vele Tecnologia
          </p>
          <h1 className="mt-5 max-w-3xl text-5xl font-semibold tracking-[-0.055em] text-zinc-950 sm:text-7xl">
            Campanhas em movimento.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-zinc-600">
            Conheça as iniciativas, soluções e experiências digitais criadas pela
            Vele para impulsionar negócios.
          </p>
        </section>

        <section aria-labelledby="campanhas-ativas" className="border-t border-zinc-300 py-12">
          <h2 id="campanhas-ativas" className="text-sm font-semibold tracking-[0.16em] uppercase">
            Campanhas ativas
          </h2>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {activeCampaigns.map((campaign) => (
              <Link
                key={campaign.slug}
                href={`/${campaign.slug}`}
                className="group flex min-h-72 flex-col justify-between overflow-hidden rounded-3xl bg-black p-7 text-white transition-transform hover:-translate-y-1 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-500 sm:p-9"
              >
                <div className="flex items-start justify-between">
                  <span className="rounded-full bg-amber-400 px-3 py-1 text-xs font-semibold tracking-wider text-black uppercase">
                    Em andamento
                  </span>
                  <ArrowUpRight className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </div>
                <div>
                  <h3 className="text-3xl font-semibold tracking-tight">
                    {campaign.title.replace(" | Vele", "")}
                  </h3>
                  <p className="mt-3 max-w-lg leading-7 text-zinc-400">
                    {campaign.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </Container>
    </main>
  );
}
