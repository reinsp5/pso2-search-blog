export default defineNuxtRouteMiddleware(async () => {
  if (!process.server) {
    const { checkAuthState, isAuthed } = useAuth();
    await checkAuthState();

    if (!isAuthed.value) {
      console.log("ログインしていません");
      return await navigateTo("/signin", { redirectCode: 302 });
    }
  }
});
