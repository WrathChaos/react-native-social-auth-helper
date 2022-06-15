import auth from "@react-native-firebase/auth";
import { GoogleSignin } from "@react-native-google-signin/google-signin";

export const googleLogin = async (checkIfEmailExists?: boolean) => {
  const { idToken, user } = await GoogleSignin.signIn();

  const googleCredential = auth.GoogleAuthProvider.credential(idToken);
  if (checkIfEmailExists) {
    const methods = await auth().fetchSignInMethodsForEmail(user.email);
    const isMethodSame = methods.includes("google.com");
    const isEmailExists = Boolean(methods.length);
    if (!isMethodSame && methods.length > 0) {
      return Promise.reject({
        code: "login method is not google",
        socialType: methods[0],
      });
    }
    const authCredential = await auth().signInWithCredential(googleCredential);
    return {
      user,
      googleCredential,
      authCredential,
      idToken,
      isEmailExists,
      isMethodSame,
    };
  } else {
    const authCredential = await auth().signInWithCredential(googleCredential);
    return { authCredential, idToken, user };
  }
};
