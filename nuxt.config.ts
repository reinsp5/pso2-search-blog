import vuetify from "vite-plugin-vuetify";
import tailwindTypography from "@tailwindcss/typography";

export default defineNuxtConfig({
  devtools: true,
  modules: ["@nuxtjs/fontaine", "@nuxtjs/tailwindcss"],
  typescript: {
    strict: true,
    typeCheck: true,
  },
  nitro: {
    preset: "cloudflare-pages",
  },
  build: {
    transpile: ["vuetify"],
  },
  hooks: {
    "vite:extendConfig": (config) => {
      config.plugins!.push(vuetify());
    },
  },
  vite: {
    ssr: {
      noExternal: ["vuetify"],
    },
    define: {
      "process.env.DEBUG": false,
    },
  },
  css: ["@/assets/css/main.scss"],
  tailwindcss: {
    config: {
      prefix: "tw-",
      plugins: [tailwindTypography],
    },
  },
  components: [
    {
      path: "@/components",
      pathPrefix: false,
    },
  ],
  experimental: {
    viewTransition: true,
  },
  runtimeConfig: {
    newt: {
      spaceUid: "",
      cdnApiToken: "",
    },
  },
  app: {
    head: {
      title: "PSO2 Search ブログ",
      htmlAttrs: {
        lang: "ja",
        prefix: "og: http://ogp.me/ns#",
      },
      link: [
        {
          rel: "apple-icon",
          sizes: "180x180",
          href: "/favicons/apple-touch-icon.png",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "32x32",
          href: "/favicons/favicon-32x32.png",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "16x16",
          href: "/favicons/favicon-16x16.png",
        },
        {
          rel: "manifest",
          href: "/favicons/site.webmanifest",
        },
      ],
      meta: [
        {
          name: "msapplication-TileColor",
          content: "#da532c",
        },
        {
          name: "theme-color",
          content: "#ffffff",
        },
        {
          name: "twitter:card",
          content: "summary_large_image",
        },
        {
          name: "twitter:site",
          content: "@reinsp5",
        },
        {
          name: "twitter:creator",
          content: "@reinsp5",
        },
        {
          property: "og:type",
          content: "website",
        },
        {
          property: "og:site_name",
          content: "PSO2 Search",
        },
        {
          property: "og:title",
          content: "PSO2 Search",
        },
        {
          property: "og:description",
          content: "全アークスのための非公式アイテム検索エンジン",
        },
        {
          property: "og:image",
          content: "https://pso2-search.com/images/ogp.webp",
        },
      ],
    },
  },
});
