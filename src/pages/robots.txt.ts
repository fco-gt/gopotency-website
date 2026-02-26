import type { APIRoute } from "astro";

const robotsTxt = `
User-agent: *
Allow: /
Crawl-delay: 10

Sitemap: [SITE_URL]sitemap-index.xml
`.trim();

export const GET: APIRoute = ({ site }) => {
  const siteUrl = site ? site.toString() : "https://gopotency.vercel.app/";
  // Ensure siteUrl ends with a slash for the sitemap concatenation if needed, 
  // but Sitemap: expects a full URL. Site usually provides it.
  const content = robotsTxt.replace("[SITE_URL]", siteUrl.endsWith("/") ? siteUrl : `${siteUrl}/`);
  return new Response(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
};
