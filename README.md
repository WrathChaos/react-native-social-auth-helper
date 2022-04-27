<img alt="React Native Social Auth Helper" src="assets/logo.png" width="1050"/>


[![npm version](https://img.shields.io/npm/v/react-native-social-auth-helper.svg?style=for-the-badge)](https://www.npmjs.com/package/react-native-social-auth-helper)
[![npm](https://img.shields.io/npm/dt/react-native-social-auth-helper.svg?style=for-the-badge)](https://www.npmjs.com/package/react-native-social-auth-helper)
![Platform - Android and iOS](https://img.shields.io/badge/platform-Android%20%7C%20iOS-blue.svg?style=for-the-badge)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg?style=for-the-badge)](https://github.com/prettier/prettier)


# Installation

Add the dependency:

```bash
npm i react-native-social-auth-helper
```

## Peer Dependencies

<h5><i>IMPORTANT! You need install them</i></h5>

```json
"@invertase/react-native-apple-authentication": ">= 2.1.5", 
"@react-native-firebase/auth": ">= 14.8.0",
"@react-native-google-signin/google-signin": ">= 7.2.2",
"react-native-fbsdk-next": ">= 8.0.0"
```

# Usage

## Import

```jsx
import {
  appleLogin,
  facebookLogin,
  fetchFacebookUserData,
  googleLogin,
} from "react-native-social-auth-helper";
```

## Facebook Login Usage

```js
import {
  facebookLogin,
  fetchFacebookUserData,
} from "react-native-social-auth-helper";
import { AccessToken } from "react-native-fbsdk-next";

export const handleFacebookLogin = async () => {
    const { authCredential, accessToken } = await facebookLogin();
    const fbUserData = await fetchFacebookUserData(accessToken);
    const { id, email, name, picture } = fbUserData;
    await auth().signInWithCredential(authCredential);
    // Successfully login and fetched the facebook user data
    // ... your logic
}
```


## Google Login Usage

Do not forget to add your webCientId for Google configuration

```js
import { googleLogin } from "react-native-social-auth-helper";
import { GoogleSignin } from "@react-native-google-signin/google-signin";

GoogleSignin.configure({
  offlineAccess: false,
  webClientId:
    "your-web-client-id",
});

export const handleGoogleLogin = async () => {
    await GoogleSignin.hasPlayServices();
    const { authCredential, user } = await googleLogin();
    const { id, email, name, photo } = user;
    // Successfully login and fetched the google user data
    // ... your logic  
}
```


## Apple Login Usage

```js
import { appleLogin } from "react-native-social-auth-helper";

export const handleGoogleLogin = async () => {
    const { appleAuthRequestResponse, userCredential } = await appleLogin();
    const { email, fullName } = appleAuthRequestResponse;
    const userData = {
      id: userCredential.user.uid,
      socialId: userCredential.user.providerData[0].uid,
      socialType: SOCIAL_TYPE.APPLE,
      email: email,
      username: fullName?.givenName || null,
      photo: userCredential.user.photoURL,
    };
    // Successfully login and fetched the apple user data
    // ... your logic  
}
```

## Future Plans

- [x] ~~LICENSE~~
- [ ] Write an article about the lib on Medium


## Author

FreakyCoder, kurayogun@gmail.com

## License

React Native Social Auth Helper is available under the MIT license. See the LICENSE file for more info.
