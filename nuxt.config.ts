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
  modules: ["nuxt-icons"],
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
      title: "PSO2アイテムデータベース",
      htmlAttrs: {
        lang: "ja",
      },
    },
  },
});
