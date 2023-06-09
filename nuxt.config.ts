import vuetify from "vite-plugin-vuetify";

export default defineNuxtConfig({
  modules: ["nuxt-icons"],
  typescript: {
    strict: true,
    typeCheck: true,
  },
  nitro: {
    preset: "cloudflare_pages"
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
    minioAccessKey: "",
    minioAccessSecret: "",
    cloudflareImagesKey: "",
    public: {
      firebaseApiKey: "",
      firebaseAuthDomain: "",
      firebaseProjectId: "",
      firebaseStorageBucket: "",
      firebaseMessagingSenderId: "",
      firebaseAppId: "",
      firebaseMeasurementId: "",
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
