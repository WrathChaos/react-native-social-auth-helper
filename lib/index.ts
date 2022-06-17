import { appleLogin } from "./apple/AppleHelper";
import { googleLogin } from "./google/GoogleHelper";
import { FacebookUserResponseData } from "./facebook/FacebookUserResponseData.model";
import {
  FB_AUTH,
  facebookLogin,
  fetchFacebookUserData,
} from "./facebook/FacebookHelper";

export const LOGIN_MATCH_ERROR = "login method is not the match";

export { appleLogin, googleLogin, facebookLogin, fetchFacebookUserData };
export type { FB_AUTH };
export type { FacebookUserResponseData };
