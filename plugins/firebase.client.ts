import { initializeApp } from "firebase/app";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { connectFirestoreEmulator, getFirestore } from "firebase/firestore";
import { connectFunctionsEmulator,getFunctions } from "firebase/functions";

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();
  const firebaseConfig = {
    apiKey: config.public.firebaseApiKey,
    authDomain: config.public.firebaseAuthDomain,
    projectId: config.public.firebaseProjectId,
    appId: config.public.firebaseAppId,
  };

  initializeApp(firebaseConfig);

  const isEmulating = window.location.hostname === "localhost";
  if (isEmulating) {
    const auth = getAuth();
    connectAuthEmulator(auth, "http://localhost:9099");

    const store = getFirestore();
    connectFirestoreEmulator(store, "localhost", 8080);

    const functions = getFunctions();
    connectFunctionsEmulator(functions, "localhost", 5001);
  }
});
