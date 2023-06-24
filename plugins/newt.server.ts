import { createClient } from "newt-client-js";

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();
  const newtClient = createClient({
    spaceUid: config.newt.spaceUid,
    token: config.newt.cdnApiToken,
    apiType: "cdn",
  });
  return {
    provide: {
      newtClient,
    },
  };
});
