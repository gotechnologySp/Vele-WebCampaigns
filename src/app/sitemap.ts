import type { MetadataRoute } from "next";
import { campaigns } from "@/config/campaigns";
import { siteConfig } from "@/config/site";
export default function sitemap(): MetadataRoute.Sitemap { return Object.values(campaigns).filter((item) => item.status === "active").map((item) => ({ url: `${siteConfig.url}/${item.slug}`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 })); }
