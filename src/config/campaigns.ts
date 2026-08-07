import type { Campaign } from "@/types/campaign";

export const movimentoTecnologicoCampaign: Campaign = {
    slug: "movimento-tecnologico",
    status: "active",
    title: "Movimento tecnológico | Vele",
    description: "Sites rápidos, modernos e estrategicamente preparados para gerar oportunidades de negócio.",
    socialImage: "/images/movimento-tecnologico-social.svg",
};

export const campaigns: Record<string, Campaign> = {
  "movimento-tecnologico": movimentoTecnologicoCampaign,
};

export const movementContent = {
  process: ["Descoberta", "Estratégia", "Design", "Construção", "Publicação"],
  cases: [
    { segment: "Produto digital", title: "Showcase de produto", metric: "Projeto 01", url: "https://crafto.themezaa.com/product-showcase/", image: "/images/projects/product-showcase.png", mobileImage: "/images/projects/product-showcase-mobile.png" },
    { segment: "Gastronomia", title: "Experiência de restaurante", metric: "Projeto 02", url: "https://crafto.themezaa.com/restaurant/", image: "/images/projects/restaurant.png", mobileImage: "/images/projects/restaurant-mobile.png" },
    { segment: "Arquitetura", title: "Arquitetura contemporânea", metric: "Projeto 03", url: "https://crafto.themezaa.com/architecture/", image: "/images/projects/architecture.png", mobileImage: "/images/projects/architecture-mobile.png" },
    { segment: "Agência digital", title: "Web agency", metric: "Projeto 04", url: "https://crafto.themezaa.com/web-agency/", image: "/images/projects/web-agency.png", mobileImage: "/images/projects/web-agency-mobile.png" },
    { segment: "Mercado imobiliário", title: "Experiência imobiliária", metric: "Projeto 05", url: "https://crafto.themezaa.com/real-estate/", image: "/images/projects/real-estate.png", mobileImage: "/images/projects/real-estate-mobile.png" },
  ],
  features: [
    { title: "Negócio antes da tecnologia", text: "Entendemos seu mercado, público e objetivo antes de definir qualquer solução." },
    { title: "Presença que gera oportunidades", text: "Construímos jornadas claras para transformar visitas em contatos e novas conversas comerciais." },
    { title: "Engenharia para durar", text: "Desenvolvemos sites rápidos, seguros e preparados para busca, integração e evolução." },
    { title: "Parceria além da entrega", text: "Acompanhamos os próximos movimentos para que seu site não fique parado no tempo." },
  ],
} as const;
