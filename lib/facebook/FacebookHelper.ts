import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { LoginManager, AccessToken } from "react-native-fbsdk-next";
import { FacebookUserResponseData } from "./FacebookUserResponseData.model";

const FACEBOOK_GRAPH_URL = (accessToken: string) =>
  `https://graph.facebook.com/v2.5/me?fields=email,name,picture.type(large)&access_token=${accessToken}`;
const DEFAULT_FB_PERMISSIONS: string[] = ["public_profile", "email"];

export declare enum FacebookError {
  USER_CANCELLED = "User cancelled the login process",
  ACCESS_TOKEN_FAILED = "Something went wrong obtaining access token",
}

export const facebookLoginWithPermissions = async (
  permissions: string[] = DEFAULT_FB_PERMISSIONS,
): Promise<FirebaseAuthTypes.UserCredential | FacebookError> => {
  const result = await LoginManager.logInWithPermissions(permissions);
  if (result.isCancelled) return FacebookError.USER_CANCELLED;

  const data = await AccessToken.getCurrentAccessToken();
  if (!data) return FacebookError.ACCESS_TOKEN_FAILED;

  const facebookCredential = auth.FacebookAuthProvider.credential(
    data.accessToken,
  );

  return auth().signInWithCredential(facebookCredential);
};

export const fetchFacebookUserData = (
  accessToken: string,
): Promise<{ data: FacebookUserResponseData }> =>
  fetch(FACEBOOK_GRAPH_URL(accessToken)).then((response) => response.json());
