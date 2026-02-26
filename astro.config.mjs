// @ts-check
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://gopotency.vercel.app",
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: "en",
        locales: {
          root: "en",
          es: "es",
        },
      },
      changefreq: "weekly",
      priority: 0.7,
      lastmod: new Date(),
    }),
    starlight({
      title: "GoPotency",
      logo: {
        src: "./src/assets/gopotency-icon.png",
        alt: "GoPotency Logo",
        replacesTitle: true,
      },
      defaultLocale: "root",
      locales: {
        root: {
          label: "English",
          lang: "en",
        },
        es: {
          label: "Español",
          lang: "es",
        },
      },
      social: [
        {
          icon: "github",
          label: "GitHub",
          href: "https://github.com/fco-gt/gopotency",
        },
      ],
      sidebar: [
        {
          label: "Start Here",
          translations: { es: "Empezar aquí" },
          items: [
            {
              label: "Introduction",
              translations: { es: "Introducción" },
              slug: "introduction",
            },
            {
              label: "Installation",
              translations: { es: "Instalación" },
              slug: "installation",
            },
            {
              label: "Quick Start",
              translations: { es: "Inicio rápido" },
              slug: "quick-start",
            },
          ],
        },
        {
          label: "Guides",
          translations: { es: "Guías" },
          items: [
            {
              label: "Configuration",
              translations: { es: "Configuración" },
              slug: "guides/configuration",
            },
            {
              label: "Key Strategies",
              translations: { es: "Estrategias de clave" },
              slug: "guides/key-strategies",
            },
            {
              label: "Request Hashing",
              translations: { es: "Request Hashing" },
              slug: "guides/request-hashing",
            },
            {
              label: "Error Handling",
              translations: { es: "Manejo de Errores" },
              slug: "guides/error-handling",
            },
            {
              label: "Storage Backends",
              translations: { es: "Almacenamiento" },
              slug: "guides/storage",
            },
            {
              label: "Performance",
              translations: { es: "Rendimiento" },
              slug: "guides/performance",
            },
            {
              label: "Contributing",
              translations: { es: "Contribución" },
              slug: "guides/contributing",
            },
          ],
        },
        {
          label: "Middleware",
          items: [
            { label: "Gin", slug: "middleware/gin" },
            {
              label: "Standard HTTP",
              translations: { es: "HTTP Estándar" },
              slug: "middleware/http",
            },
          ],
        },
      ],
      customCss: ["./src/styles/global.css"],
      favicon: "/favicon.ico",
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
