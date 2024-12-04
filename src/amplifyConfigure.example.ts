import { ResourcesConfig } from "aws-amplify";

const COGNITO_REGION = "ap-northeast-1";
const COGNITO_USER_POOL = "ap-northeast-1_XXXXXXXXX";
const COGNITO_USER_POOL_CLIENT = "dummy";

const COGNITO_DOMAIN_PREFIX = "dummy";

export const config: ResourcesConfig = {
  Auth: {
    Cognito: {
      userPoolId: COGNITO_USER_POOL,
      userPoolClientId: COGNITO_USER_POOL_CLIENT,
      loginWith: {
        oauth: {
          domain: `${COGNITO_DOMAIN_PREFIX}.auth.${COGNITO_REGION}.amazoncognito.com`,
          scopes: ["openid"],
          redirectSignIn: ["http://localhost:3000"],
          redirectSignOut: ["http://localhost:3000"],
          responseType: "code",
        },
      },
    },
  },
};
