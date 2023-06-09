import {
  signInWithEmailAndPassword,
  setPersistence,
  browserLocalPersistence,
  getAuth,
  TwitterAuthProvider,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
} from "firebase/auth";

/**
 * ytScouterの認証用カスタムフック
 * @returns
 */
export const useAuth = () => {
  // ログイントークン
  const loginError = useState<unknown | null>("loginError", () => null);

  // メールアドレスでユーザ登録
  const signUpMail = async (email: string, password: string) => {
    try {
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      // ログイン永続化
      await setPersistence(auth, browserLocalPersistence);
      return navigateTo("/");
    } catch (error: unknown) {
      loginError.value = error;
    }
  };

  // メールアドレスでログイン
  const signInMail = async (email: string, password: string) => {
    try {
      const auth = getAuth();
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      // ログイン永続化
      await setPersistence(auth, browserLocalPersistence);
      return navigateTo("/");
    } catch (error: any) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error(errorMessage);
      loginError.value = error;
    }
  };

  // Googleでログイン
  const signInGoogle = async () => {
    try {
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      const userCredential = await signInWithPopup(auth, provider);
      // ログイン永続化
      await setPersistence(auth, browserLocalPersistence);
      return navigateTo("/");
    } catch (error: any) {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      console.error(errorMessage);
      loginError.value = error;
    }
  };

  // Twitterでログイン
  const signInTwitter = async () => {
    try {
      const auth = getAuth();
      const provider = new TwitterAuthProvider();
      const userCredential = await signInWithPopup(auth, provider);
      // ログイン永続化
      await setPersistence(auth, browserLocalPersistence);
      return navigateTo("/");
    } catch (error: any) {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = TwitterAuthProvider.credentialFromError(error);
      console.error(errorMessage);
      loginError.value = error;
    }
  };

  // ログアウト
  const signOut = async () => {
    const auth = getAuth();
    try {
      await auth.signOut();
      return navigateTo("/");
    } catch (error: unknown) {
      loginError.value = error;
    }
  };

  return {
    loginError,
    signUpMail,
    signInMail,
    signInTwitter,
    signInGoogle,
    signOut,
  };
};
