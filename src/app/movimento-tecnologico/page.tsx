import { CaseGrid } from "@/components/campaigns/CaseGrid";
import { CampaignCase } from "@/components/campaigns/CampaignCase";
import { FeatureGrid } from "@/components/campaigns/FeatureGrid";
import { FinalCTA } from "@/components/campaigns/FinalCTA";
import { HeroSection } from "@/components/campaigns/HeroSection";
import { ProcessSteps } from "@/components/campaigns/ProcessSteps";
import { WhatsAppButton } from "@/components/campaigns/WhatsAppButton";
import { CampaignFooter } from "@/components/layout/CampaignFooter";
import { CampaignHeader } from "@/components/layout/CampaignHeader";
import { movimentoTecnologicoCampaign } from "@/config/campaigns";
import { siteConfig } from "@/config/site";

export default function MovimentoTecnologicoPage() {
  const campaign = movimentoTecnologicoCampaign;
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Criação e reformulação de sites profissionais",
    description: campaign.description,
    provider: { "@type": "Organization", name: "Vele Tecnologia", url: siteConfig.officialUrl },
    areaServed: "BR",
    url: `${siteConfig.url}/${campaign.slug}`,
  };

  return (
    <>
      <CampaignHeader />
      <main id="conteudo">
        <HeroSection />
        <section id="case" className="scroll-mt-28">
          <CampaignCase />
        </section>
        <section id="processo" className="scroll-mt-28 bg-zinc-950">
          <ProcessSteps />
        </section>
        <section id="projetos" className="scroll-mt-28">
          <CaseGrid />
        </section>
        <section id="diferenciais" className="scroll-mt-28">
          <FeatureGrid />
        </section>
        <FinalCTA />
      </main>
      <CampaignFooter />
      <WhatsAppButton />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />
    </>
  );
}
