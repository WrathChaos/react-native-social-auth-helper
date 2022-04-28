import auth from "@react-native-firebase/auth";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { GoogleError } from "./GoogleError";

export const googleLogin = async (checkIfEmailExists?: boolean) => {
  const { idToken, user } = await GoogleSignin.signIn();

  const googleCredential = auth.GoogleAuthProvider.credential(idToken);
  if (checkIfEmailExists) {
    const methods = await auth().fetchSignInMethodsForEmail(user.email);
    const emailExists = methods.length;
    if (!emailExists) {
      const authCredential = await auth().signInWithCredential(
        googleCredential,
      );
      return { authCredential, idToken, user };
    }
    return GoogleError.EMAIL_EXISTS;
  } else {
    const authCredential = await auth().signInWithCredential(googleCredential);
    return { authCredential, idToken, user };
  }
};
