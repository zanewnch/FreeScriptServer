import jwt from "jsonwebtoken";

export class JWT {
  public static createToken = (username: string) => {
    const payload = {
      sub: "1234567890",
      name: username,
      iat: 1516239022,
    };
    // return jwt.sign(payload, process.env.JWT_SECRET, {
    // expiresIn: "240h",
    // });
    return jwt.sign(payload, process.env.JWT_SECRET);
  };

  /* 


    jwt.verify(token, secretOrPublicKey): 此方法用於驗證傳入的 token 是否有效。它需要兩個參數：要驗證的 token 和用於簽名 token 的秘密鑰匙或公鑰。如果 token 無效（例如，它已經過期，或者它沒有使用正確的秘密鑰匙簽名），則此方法將拋出一個錯誤。如果 token 有效，則此方法將返回解碼的 token。


    */
  public static verifyToken = (token: string) => {
    if (jwt.verify(token, process.env.JWT_SECRET)) return true;
  };

  /* 
    jwt.decode(token, options): 此方法只解碼 token，並返回解碼的 payload。它不驗證 token 的簽名。這意味著，即使 token 是無效的，只要它有正確的格式，此方法仍然可以解碼它。因此，你應該只在你確信 token 是有效的情況下使用此方法。
  */
  public static decodeToken = (token: string) => {
    return jwt.decode(token);
  };

  public static getPayload = (token: string) => {
    return jwt.decode(token);
  };

  public static getExpireTime = (token: string) => {
    const payload = JWT.getPayload(token);
    if (payload && typeof payload !== "string") {
      return payload.exp;
    }
    return null;
  };

  public static isTokenExpired = (token: string) => {
    const expireTime = JWT.getExpireTime(token);
    if (expireTime) {
      return Date.now() >= expireTime * 1000;
    }
    return true;
  };

  public static isTokenValid = (token: string) => {
    return !JWT.isTokenExpired(token);
  };

  public static isTokenValidAndRefresh = (token: string) => {
    if (JWT.isTokenValid(token)) {
      return token;
    }
    return null;
  };
}
