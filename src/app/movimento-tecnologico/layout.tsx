import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { movimentoTecnologicoCampaign } from "@/config/campaigns";
import { siteConfig } from "@/config/site";

const campaign = movimentoTecnologicoCampaign;
export const metadata: Metadata = { title: campaign.title, description: campaign.description, alternates: { canonical: `/${campaign.slug}` }, openGraph: { title: campaign.title, description: campaign.description, url: `/${campaign.slug}`, siteName: "Vele", locale: "pt_BR", type: "website", images: [{ url: campaign.socialImage, width: 1200, height: 630, alt: "Movimento tecnológico — Vele" }] }, twitter: { card: "summary_large_image", title: campaign.title, description: campaign.description, images: [campaign.socialImage] } };
export default function CampaignLayout({ children }: { children: React.ReactNode }) { if (campaign.status === "expired") redirect(campaign.redirectUrl ?? siteConfig.officialUrl); return children; }
