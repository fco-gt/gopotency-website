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
      components: {
        Head: "./src/components/Head.astro",
      },
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
          label: "Middleware",
          translations: { es: "Middleware" },
          items: [
            {
              label: "Overview",
              translations: { es: "Vista General" },
              slug: "middleware/overview",
            },
            { label: "Gin", slug: "middleware/gin" },
            { label: "Echo", slug: "middleware/echo" },
            { label: "Fiber", slug: "middleware/fiber" },
            {
              label: "Standard HTTP",
              translations: { es: "HTTP Estándar" },
              slug: "middleware/http",
            },
          ],
        },
        {
          label: "Storage Backends",
          translations: { es: "Soportes de Almacenamiento" },
          items: [
            {
              label: "Overview",
              translations: { es: "Vista General" },
              slug: "storage/overview",
            },
            {
              label: "In-Memory",
              translations: { es: "En Memoria" },
              slug: "storage/memory",
            },
            { label: "Redis", slug: "storage/redis" },
            { label: "GORM", slug: "storage/gorm" },
            { label: "SQL", slug: "storage/sql" },
          ],
        },
        {
          label: "Advanced Guides",
          translations: { es: "Guías Avanzadas" },
          items: [
            {
              label: "Best Practices",
              translations: { es: "Mejores Prácticas" },
              slug: "guides/best-practices",
            },
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
      ],
      customCss: ["./src/styles/global.css"],
      favicon: "/favicon.ico",
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
