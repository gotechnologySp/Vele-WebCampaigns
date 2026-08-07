export const siteConfig = {
  name: "Vele Campanhas",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://campanhas.vele.com.br",
  officialUrl: process.env.NEXT_PUBLIC_OFFICIAL_SITE_URL ?? "https://vele.com.br",
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "",
  social: {
    instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL ?? "",
    linkedin: process.env.NEXT_PUBLIC_LINKEDIN_URL ?? "",
    youtube: process.env.NEXT_PUBLIC_YOUTUBE_URL ?? "",
    facebook: process.env.NEXT_PUBLIC_FACEBOOK_URL ?? "",
  },
  contact: {
    email: "contato@vele.com.br",
    address: "Av. Paulista, 1471, Cj 511 — Bela Vista — São Paulo/SP — CEP 01311-927",
    legalName: "Vele Tecnologia LTDA",
    taxId: "CNPJ 53.618.792/0001-29",
  },
} as const;
