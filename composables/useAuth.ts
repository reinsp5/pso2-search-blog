import {
  setPersistence,
  browserLocalPersistence,
  getAuth,
  deleteUser,
  TwitterAuthProvider,
  signInWithPopup,
  GoogleAuthProvider,
  updateProfile,
  updateEmail,
} from "firebase/auth";
import { getFirestore, setDoc, doc, deleteDoc } from "firebase/firestore";

/**
 * ytScouterの認証用カスタムフック
 * @returns
 */
export const useAuth = () => {
  // エラー情報
  const loginError = useState<unknown | null>("loginError", () => null);

  // Googleでログイン
  const signInGoogle = async () => {
    try {
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      const userCredential = await signInWithPopup(auth, provider);

      const store = getFirestore();
      // ユーザー情報をfirestoreに保存
      await setDoc(doc(store, "users", userCredential.user.uid), {
        uid: userCredential.user.uid,
        displayName: userCredential.user.displayName,
      });

      // ログイン永続化
      await setPersistence(auth, browserLocalPersistence);
      return navigateTo("/");
    } catch (error: any) {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
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

      const store = getFirestore();

      // ユーザー情報をfirestoreに保存
      await setDoc(doc(store, "users", userCredential.user.uid), {
        uid: userCredential.user.uid,
        displayName: userCredential.user.displayName,
      });

      // ログイン永続化
      await setPersistence(auth, browserLocalPersistence);
      return navigateTo("/");
    } catch (error: any) {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The AuthCredential type that was used.
      const credential = TwitterAuthProvider.credentialFromError(error);
      console.error(errorMessage);
      loginError.value = error;
    }
  };

  // ユーザ情報の更新
  const updateUser = async () => {
    const auth = getAuth();
    const displayName = useState<string>("update-displayName");
    const email = useState<string>("update-email");
    try {
      const user = auth.currentUser;
      if (user) {
        // ユーザ名に変更があれば更新
        if (displayName.value !== user.displayName) {
          await updateProfile(user, { displayName: displayName.value });
        }

        // メールアドレスに変更があれば更新
        if (email.value !== user.email) {
          await updateEmail(user, email.value);
        }
      }

      return true;
    } catch (error: unknown) {
      loginError.value = error;
      return false;
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

  // ユーザー削除
  const delUser = async () => {
    const auth = getAuth();
    const store = getFirestore();
    try {
      const user = auth.currentUser;
      if (user) {
        await deleteDoc(doc(store, "users", user.uid));
        await deleteUser(user);
        return navigateTo("/");
      }
    } catch (error: unknown) {
      loginError.value = error;
    }
  };

  return {
    loginError,
    signInTwitter,
    signInGoogle,
    signOut,
    updateUser,
    delUser,
  };
};
