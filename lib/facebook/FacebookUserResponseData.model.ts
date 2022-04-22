export interface FacebookUserResponseData {
  email: string;
  id: string;
  name: string;
  picture?: Picture;
}

interface Picture {
  data?: { url: string };
}
