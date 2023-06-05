import {
  signInWithEmailAndPassword,
  setPersistence,
  browserLocalPersistence,
  getAuth,
  TwitterAuthProvider,
  signInWithPopup,
} from "firebase/auth";

/**
 * ytScouterの認証用カスタムフック
 * @returns 
 */
export const useAuth = () => {
  // ログイントークン
  const loginError = useState<unknown | null>("loginError", () => null);

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
    } catch (error: unknown) {
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
    } catch (error: unknown) {
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
    signInMail,
    signInTwitter,
    signOut,
  };
};