import type { MetadataRoute } from "next";
export default function manifest(): MetadataRoute.Manifest { return { name: "Vele Campanhas", short_name: "Vele", description: "Campanhas da Vele Tecnologia", start_url: "/", display: "standalone", background_color: "#ffffff", theme_color: "#ffbf00", icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }] }; }
