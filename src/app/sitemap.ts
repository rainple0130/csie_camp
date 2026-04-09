import type { MetadataRoute } from "next";

export const dynamic = "force-static";

const SITE_URL = "https://csiecamp.csie.org";

const ROUTES = ["", "/activities", "/courses", "/apply", "/faq"];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return ROUTES.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.8,
  }));
}