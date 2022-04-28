import { appleLogin } from "./apple/AppleHelper";
import { googleLogin } from "./google/GoogleHelper";
import {
  FB_AUTH,
  facebookLogin,
  fetchFacebookUserData,
} from "./facebook/FacebookHelper";
import { FacebookUserResponseData } from "./facebook/FacebookUserResponseData.model";
import { FacebookError } from "./facebook/FacebookError";
import { AppleError } from "./apple/AppleError";
import { GoogleError } from "./google/GoogleError";

export {
  appleLogin,
  googleLogin,
  GoogleError,
  AppleError,
  FacebookError,
  facebookLogin,
  fetchFacebookUserData,
};
export type { FB_AUTH };
export type { FacebookUserResponseData };
