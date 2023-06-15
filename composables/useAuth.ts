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
  onAuthStateChanged,
} from "firebase/auth";
import {
  getFirestore,
  setDoc,
  doc,
  deleteDoc,
  getDoc,
} from "firebase/firestore";

/**
 * ytScouterの認証用カスタムフック
 * @returns
 */
export const useAuth = () => {
  // エラー情報
  const loginError = useState<unknown | null>("loginError", () => null);
  const isAuthed = useState<boolean>("is-authened", () => false);

  // Googleでログイン
  const signInGoogle = async () => {
    try {
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      const userCredential = await signInWithPopup(auth, provider);
      // ログイン永続化
      await setPersistence(auth, browserLocalPersistence);

      const store = getFirestore();
      // ユーザー情報がfirestoreに存在するか確認し、無ければ作成する。
      // 作成後はユーザー名変更画面へ遷移する。
      const userDoc = await getDoc(
        doc(store, "users", userCredential.user.uid)
      );
      if (!userDoc.exists()) {
        // ユーザー情報をfirestoreに保存
        await setDoc(doc(store, "users", userCredential.user.uid), {
          displayName: userCredential.user.displayName,
        });

        // ユーザー名変更画面へ遷移
        return await navigateTo("/namechange");
      }

      // firestore上のユーザ情報で初回のユーザー名変更が完了しているか確認し、
      // 完了していなければユーザー名変更画面へ遷移
      if (!userDoc.data().firstDisplayNameChanged) {
        // ログイン永続化
        return await navigateTo("/namechange");
      }

      // それ以外の場合はトップページへ遷移
      return await navigateTo("/");
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
      // ログイン永続化
      await setPersistence(auth, browserLocalPersistence);

      const store = getFirestore();
      // ユーザー情報がfirestoreに存在するか確認し、無ければ作成する。
      // 作成後はユーザー名変更画面へ遷移する。
      const userDoc = await getDoc(
        doc(store, "users", userCredential.user.uid)
      );
      if (!userDoc.exists()) {
        // ユーザー情報をfirestoreに保存
        await setDoc(doc(store, "users", userCredential.user.uid), {
          displayName: userCredential.user.displayName,
        });

        // ユーザー名変更画面へ遷移
        return await navigateTo("/namechange", { redirectCode: 301 });
      }

      // firestore上のユーザ情報で初回のユーザー名変更が完了しているか確認し、
      // 完了していなければユーザー名変更画面へ遷移
      if (!userDoc.data().firstDisplayNameChanged) {
        // ログイン永続化
        return await navigateTo("/namechange", { redirectCode: 301 });
      }

      // それ以外の場合はトップページへ遷移
      return await navigateTo("/", { redirectCode: 301 });
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

  // 初回のユーザー名設定
  const setUserNameFirst = async (displayName: string) => {
    const auth = getAuth();
    try {
      const user = auth.currentUser;
      if (user) {
        // ユーザー名を更新
        await updateProfile(user, { displayName: displayName });

        const store = getFirestore();
        // ユーザー情報をfirestoreに保存
        await setDoc(doc(store, "users", user.uid), {
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
    const auth = getAuth();
    try {
      const user = auth.currentUser;
      if (user) {
        // 新しいユーザ名が渡されていれば更新
        if (displayName && displayName !== user.displayName) {
          await updateProfile(user, { displayName: displayName });
          const store = getFirestore();
          // ユーザー情報をfirestoreに保存
          await setDoc(doc(store, "users", user.uid), {
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
        // ユーザー情報をfirestoreから削除
        await deleteDoc(doc(store, "users", user.uid));
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
      const auth = getAuth();
      onAuthStateChanged(
        auth,
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

  return {
    loginError,
    signInTwitter,
    signInGoogle,
    signOut,
    setUserNameFirst,
    updateUser,
    delUser,
    checkAuthState,
    isAuthed,
  };
};
