import {
  deleteUser,
  TwitterAuthProvider,
  GoogleAuthProvider,
  updateProfile,
  updateEmail,
  onAuthStateChanged,
  signInWithRedirect,
} from "firebase/auth";
import { setDoc, doc, deleteDoc, getDoc } from "firebase/firestore";

/**
 * ytScouterの認証用カスタムフック
 * @returns
 */
export const useAuth = () => {
  // エラー情報
  const loginError = useState<unknown | null>("loginError", () => null);
  const isAuthed = useState<boolean>("is-authed", () => false);

  // Googleでログイン
  const signInGoogle = async () => {
    try {
      const { $auth } = useNuxtApp();
      const provider = new GoogleAuthProvider();
      await signInWithRedirect($auth, provider);
    } catch (error: any) {
      console.error(error.message);
    }
  };

  // Twitterでログイン（リダイレクト方式）
  const signInTwitter = async () => {
    try {
      const { $auth } = useNuxtApp();
      const provider = new TwitterAuthProvider();
      await signInWithRedirect($auth, provider);
    } catch (error: any) {
      console.error(error.message);
    }
  };

  // 初回のユーザー名設定
  const setUserNameFirst = async (displayName: string) => {
    const { $auth, $store } = useNuxtApp();
    try {
      const user = $auth.currentUser;
      if (user) {
        // ユーザー名を更新
        await updateProfile(user, { displayName: displayName });

        // ユーザー情報をfirestoreに保存
        await setDoc(doc($store, "users", user.uid), {
          displayName: user.displayName,
          firstDisplayNameChanged: true,
        });
      }

      return true;
    } catch (error: unknown) {
      loginError.value = error;
      return false;
    }
  };

  // ユーザ情報の更新
  const updateUser = async (displayName?: string, email?: string) => {
    const { $auth, $store } = useNuxtApp();
    try {
      const user = $auth.currentUser;
      if (user) {
        // 新しいユーザ名が渡されていれば更新
        if (displayName && displayName !== user.displayName) {
          await updateProfile(user, { displayName: displayName });
          // ユーザー情報をfirestoreに保存
          await setDoc(doc($store, "users", user.uid), {
            displayName: user.displayName,
            firstDisplayNameChanged: true,
          });
        }
        // 新しいメールアドレスが渡されていれば更新
        if (email && email !== user.email) {
          await updateEmail(user, email);
        }
        return true;
      } else {
        return false;
      }
    } catch (error: unknown) {
      loginError.value = error;
      return false;
    }
  };

  // ログアウト
  const signOut = async () => {
    const { $auth } = useNuxtApp();
    try {
      await $auth.signOut();
      return navigateTo("/");
    } catch (error: unknown) {
      loginError.value = error;
    }
  };

  // ユーザー削除
  const delUser = async () => {
    const { $auth, $store } = useNuxtApp();
    try {
      const user = $auth.currentUser;
      if (user) {
        // ユーザー情報をfirestoreから削除
        await deleteDoc(doc($store, "users", user.uid));
        // ユーザー情報をauthから削除
        await deleteUser(user);

        return navigateTo("/");
      }
    } catch (error: unknown) {
      loginError.value = error;
    }
  };

  // ログイン状況の確認
  const checkAuthState = async () => {
    return await new Promise<boolean>((resolve, reject) => {
      if (process.server) return resolve(false);
      const { $auth } = useNuxtApp();
      onAuthStateChanged(
        $auth,
        (user) => {
          if (user) {
            isAuthed.value = true;
            resolve(true);
          } else {
            isAuthed.value = false;
            resolve(false);
          }
        },
        (error) => {
          isAuthed.value = false;
          reject(false);
        }
      );
    });
  };

  // ユーザ情報の取得
  const getUserDoc = async () => {
    const { $auth, $store } = useNuxtApp();
    try {
      const user = $auth.currentUser;
      if (user) {
        const userDoc = await getDoc(doc($store, "users", user.uid));
        if (userDoc.exists()) {
          return userDoc.data();
        }
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
    setUserNameFirst,
    updateUser,
    delUser,
    checkAuthState,
    getUserDoc,
    isAuthed,
  };
};
