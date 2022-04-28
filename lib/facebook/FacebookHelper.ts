import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { AccessToken, LoginManager } from "react-native-fbsdk-next";
import { FacebookUserResponseData } from "./FacebookUserResponseData.model";
import { FacebookError } from "./FacebookError";

const FACEBOOK_GRAPH_URL = (accessToken: string) =>
  `https://graph.facebook.com/v2.5/me?fields=email,name,picture.type(large)&access_token=${accessToken}`;
const DEFAULT_FB_PERMISSIONS: string[] = ["public_profile", "email"];

export interface FB_AUTH {
  accessToken: string;
  userCredential: FirebaseAuthTypes.UserCredential;
  userData: FacebookUserResponseData;
}

export const facebookLogin = async (
  checkIfEmailExists?: boolean,
  permissions: string[] = DEFAULT_FB_PERMISSIONS,
): Promise<FB_AUTH | FacebookError> => {
  const result = await LoginManager.logInWithPermissions(permissions);
  if (result.isCancelled) {
    return FacebookError.USER_CANCELLED;
  }

  const data = await AccessToken.getCurrentAccessToken();
  if (!data) {
    return FacebookError.ACCESS_TOKEN_FAILED;
  }

  const facebookCredential = auth.FacebookAuthProvider.credential(
    data.accessToken,
  );

  const fbUserData = await fetchFacebookUserData(data.accessToken);

  if (checkIfEmailExists) {
    const methods = await auth().fetchSignInMethodsForEmail(fbUserData.email);
    const emailExists = methods.length;
    if (!emailExists) {
      const userCredential = await auth().signInWithCredential(
        facebookCredential,
      );
      return {
        userCredential,
        accessToken: data.accessToken,
        userData: fbUserData,
      };
    }
    return FacebookError.EMAIL_EXISTS;
  } else {
    const userCredential = await auth().signInWithCredential(
      facebookCredential,
    );
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
