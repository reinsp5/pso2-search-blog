import vuetify from "vite-plugin-vuetify";

const {
  NUXT_PUBLIC_FIREBASE_API_KEY,
  NUXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  NUXT_PUBLIC_FIREBASE_PROJECT_ID,
  NUXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  NUXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  NUXT_PUBLIC_FIREBASE_APP_ID,
  NUXT_CLOUDFLARE_IMAGES_KEY,
  NUXT_PUBLIC_MEILISEARCH_API_KEY,
} = process.env;

export default defineNuxtConfig({
  ssr: false,
  nitro: {
    preset: "cloudflare-pages",
    externals: {
      external: ["fabric","canvas", "canvas-prebuilt"],
    },
  },
  routeRules: {
    "/item/create": { ssr: false },
    "/item/edit/:id": { ssr: false },
  },
  modules: ["nuxt-icons", "@nuxtjs/fontaine"],
  typescript: {
    strict: true,
    typeCheck: true,
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
    cloudflareImagesKey: NUXT_CLOUDFLARE_IMAGES_KEY || "",
    public: {
      firebaseApiKey: NUXT_PUBLIC_FIREBASE_API_KEY || "",
      firebaseAuthDomain: NUXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "",
      firebaseProjectId: NUXT_PUBLIC_FIREBASE_PROJECT_ID || "",
      firebaseStorageBucket: NUXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "",
      firebaseMessagingSenderId: NUXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "",
      firebaseAppId: NUXT_PUBLIC_FIREBASE_APP_ID || "",
      firebaseMeasurementId: "",
      meilisearchApiKey: NUXT_PUBLIC_MEILISEARCH_API_KEY || "",
    },
  },
  app: {
    head: {
      title: "PSO2 Search",
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
          property: "og:type",
          content: "website",
        },
        {
          property: "og:site_name",
          content: "PSO2 Search",
        },
        {
          property: "og:image",
          content: "/images/ogp.webp",
        },
      ],
    },
  },
});
