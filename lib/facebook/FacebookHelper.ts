import { LOGIN_MATCH_ERROR } from "../index";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { AccessToken, LoginManager } from "react-native-fbsdk-next";
import { FacebookUserResponseData } from "./FacebookUserResponseData.model";

const FACEBOOK_GRAPH_URL = (accessToken: string) =>
  `https://graph.facebook.com/v2.5/me?fields=email,name,picture.type(large)&access_token=${accessToken}`;
const DEFAULT_FB_PERMISSIONS: string[] = ["public_profile", "email"];

export interface FB_AUTH {
  accessToken: string;
  userData: FacebookUserResponseData;
  userCredential?: FirebaseAuthTypes.UserCredential;
  isEmailExists?: boolean;
  isMethodSame?: boolean;
}

export const facebookLogin = async (
  checkIfEmailExists?: boolean,
  permissions: string[] = DEFAULT_FB_PERMISSIONS,
): Promise<FB_AUTH> => {
  const result = await LoginManager.logInWithPermissions(permissions);

  if (result.isCancelled) {
    throw "User cancelled the login process";
  }

  const data = await AccessToken.getCurrentAccessToken();
  if (!data) {
    throw "Something went wrong obtaining access token";
  }

  const facebookCredential = auth.FacebookAuthProvider.credential(
    data.accessToken,
  );

  const fbUserData = await fetchFacebookUserData(data.accessToken);

  if (checkIfEmailExists) {
    const methods = await auth().fetchSignInMethodsForEmail(fbUserData.email);
    const isMethodSame = methods.includes("facebook.com");
    const isEmailExists = Boolean(methods.length);
    if (!isMethodSame && methods.length > 0) {
      return Promise.reject({
        code: LOGIN_MATCH_ERROR,
        socialType: methods[0],
      });
    }
    const userCredential =
      await auth().signInWithCredential(facebookCredential);
    return {
      userCredential,
      accessToken: data.accessToken,
      userData: fbUserData,
      isEmailExists,
      isMethodSame,
    };
  } else {
    const userCredential =
      await auth().signInWithCredential(facebookCredential);
    return {
      userCredential,
      accessToken: data.accessToken,
      userData: fbUserData,
    };
  }
};

export const fetchFacebookUserData = async (
  accessToken: string,
): Promise<FacebookUserResponseData> =>
  await fetch(FACEBOOK_GRAPH_URL(accessToken)).then((response) =>
    response.json(),
  );
