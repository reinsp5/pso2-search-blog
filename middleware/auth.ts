import { getAuth } from "firebase/auth";

export default defineNuxtRouteMiddleware(async () => {
  if (!process.server) {
    const user = await new Promise((resolve) => {
      const auth = getAuth();
      const unsubscribe = auth.onAuthStateChanged((user) => {
        unsubscribe();
        resolve(user);
      });
    });

    if (!user) {
      console.log("ログインしていません");
      return await navigateTo("/signin", { redirectCode: 302 });
    }
  }
});
