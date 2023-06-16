import { initializeApp } from "firebase/app";
import {
  getAuth,
  connectAuthEmulator,
  getRedirectResult,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";
import {
  connectFirestoreEmulator,
  doc,
  getDoc,
  getFirestore,
  setDoc,
} from "firebase/firestore";
import { connectFunctionsEmulator, getFunctions } from "firebase/functions";

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();
  const firebaseConfig = {
    apiKey: config.public.firebaseApiKey,
    authDomain: config.public.firebaseAuthDomain,
    projectId: config.public.firebaseProjectId,
    appId: config.public.firebaseAppId,
  };

  const app = initializeApp(firebaseConfig);

  const auth = getAuth(app);
  const store = getFirestore(app);
  const functions = getFunctions(app);

  const isEmulating = window.location.hostname === "localhost";
  if (isEmulating) {
    connectAuthEmulator(auth, "http://localhost:9099");
    connectFirestoreEmulator(store, "localhost", 8080);
    connectFunctionsEmulator(functions, "localhost", 5001);
  }

  // Firebase Authentication リダイレクトのための設定
  setPersistence(auth, browserLocalPersistence).then(() => {
    getRedirectResult(auth).then(async (result) => {
      if (result?.user) {
        // ユーザー情報がfirestoreに存在するか確認し、無ければ作成する。
        const userDoc = await getDoc(doc(store, "users", result!.user.uid));
        if (!userDoc.exists()) {
          // ユーザー情報をfirestoreに保存
          await setDoc(doc(store, "users", result!.user.uid), {
            displayName: result!.user.displayName,
          });
          // 初回登録時はユーザー名変更画面へ遷移
          return await navigateTo("/namechange", { replace: true });
        }
        // firestore上のユーザ情報で初回のユーザー名変更が完了しているか確認し、
        // 完了していなければユーザー名変更画面へ遷移
        if (!userDoc.data().firstDisplayNameChanged) {
          // ユーザ名変更画面へ遷移
          return await navigateTo("/namechange", { replace: true });
        }

        // それ以外はホーム画面へ遷移
        return await navigateTo("/", { replace: true });
      }
    });
  });

  return {
    provide: {
      auth,
      store,
      functions,
    },
  };
});
