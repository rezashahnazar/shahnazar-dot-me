import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    {
      url: new URL("/", siteConfig.url).toString(),
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
