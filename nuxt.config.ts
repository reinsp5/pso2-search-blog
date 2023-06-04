import vuetify from "vite-plugin-vuetify";

export default defineNuxtConfig({
  ssr: false,
  modules: ["nuxt-icon","nuxt-appwrite"],
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
    }
  ],
  app: {
    head: {
      title: "PSO2アイテムデータベース",
      htmlAttrs: {
        lang: "ja",
      },
    },
  },
  appwrite: {
    endpoint: "https://app.reinsp5.com/v1",
    project: "647a9d5bcd1b16d1f3ff",
  },
});
