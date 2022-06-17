import { LOGIN_MATCH_ERROR } from "../index";
import auth from "@react-native-firebase/auth";
import { appleAuth } from "@invertase/react-native-apple-authentication";
import jwtDecode, { JwtPayload } from "jwt-decode";

export interface AppleJWTPayload extends JwtPayload {
  nonce: string;
  email: string;
  email_verified: string;
  auth_time: number;
  nonce_supported: number;
}

export const appleLogin = async () => {
  const appleAuthRequestResponse = await appleAuth.performRequest({
    requestedOperation: appleAuth.Operation.LOGIN,
    requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
  });

  if (!appleAuthRequestResponse.identityToken) {
    throw "Apple Sign-In failed - no identify token returned";
  }
  const { identityToken, nonce } = appleAuthRequestResponse;
  const decoded = jwtDecode<AppleJWTPayload>(identityToken);
  const methods = await auth().fetchSignInMethodsForEmail(decoded.email);
  const isMethodSame = methods.includes("apple.com");
  const isEmailExists = Boolean(methods.length);

  if (!isMethodSame && methods.length > 0) {
    return Promise.reject({
      code: LOGIN_MATCH_ERROR,
      socialType: methods[0],
    });
  }
  const appleCredential = auth.AppleAuthProvider.credential(
    identityToken,
    nonce,
  );
  const userCredential = await auth().signInWithCredential(appleCredential);
  return {
    appleAuthRequestResponse,
    userCredential,
    isMethodSame,
    isEmailExists,
  };
};
//# sourceMappingURL=AppleHelper.js.map
