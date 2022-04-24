import auth from "@react-native-firebase/auth";
import { appleAuth } from "@invertase/react-native-apple-authentication";

export declare enum AppleError {
  NO_IDENTIFY_TOKEN = "Apple Sign-In failed - no identify token returned",
}

export const appleLogin = async () => {
  const appleAuthRequestResponse = await appleAuth.performRequest({
    requestedOperation: appleAuth.Operation.LOGIN,
    requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
  });

  if (!appleAuthRequestResponse.identityToken) {
    return AppleError.NO_IDENTIFY_TOKEN;
  }

  const { identityToken, nonce } = appleAuthRequestResponse;
  const appleCredential = auth.AppleAuthProvider.credential(
    identityToken,
    nonce,
  );

  const userCredential = auth().signInWithCredential(appleCredential);
  return { appleAuthRequestResponse, userCredential };
};
