export default defineNuxtRouteMiddleware(async () => {
  if (!process.server) {
    const { account } = useAppwrite();
    try {
      await account.get();
    } catch (e) {
      return await navigateTo("/signup", { redirectCode: 302 });
    }
  }
});
