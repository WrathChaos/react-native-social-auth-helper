import auth from "@react-native-firebase/auth";
import { GoogleSignin } from "@react-native-google-signin/google-signin";

export const googleLogin = async () => {
  const { idToken, user } = await GoogleSignin.signIn();

  const googleCredential = auth.GoogleAuthProvider.credential(idToken);
  const authCredential = await auth().signInWithCredential(googleCredential);

  return { authCredential, idToken, user };
};
