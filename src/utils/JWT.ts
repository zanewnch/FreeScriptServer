import jwt from "jsonwebtoken";

export class JWT {
  public static createToken = (username: string): string => {
    try {
      /* 
      在你的代码中，你在 JWT 的 payload 中硬编码了 iat（Issued At）字段的值为 1516239022，这是一个 Unix 时间戳，对应的日期是 2018 年 1 月 18 日。这意味着你的 token 在创建时就已经过期。

      expiresIn 选项是从 iat 字段的值开始计算的。因此，即使你设置了 expiresIn: "240h"，但由于 iat 字段的值已经过期，所以你的 token 仍然会在创建时就过期。

      如果你想让 token 在创建时开始计算过期时间，你应该移除 iat 字段，或者将其设置为当前的 Unix 时间戳。你可以使用 Math.floor(Date.now() / 1000) 来获取当前的 Unix 时间戳。
      */
      const payload = {
        sub: "1234567890",
        name: username,
        iat: Math.floor(Date.now() / 1000),
      };
      // return jwt.sign(payload, process.env.JWT_SECRET, {
      // expiresIn: "240h",
      // });
      return jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "240h",
      });
    } catch (e) {
      console.error(e);
    }
  };

  /* 


    jwt.verify(token, secretOrPublicKey): 此方法用於驗證傳入的 token 是否有效。它需要兩個參數：要驗證的 token 和用於簽名 token 的秘密鑰匙或公鑰。如果 token 無效（例如，它已經過期，或者它沒有使用正確的秘密鑰匙簽名），則此方法將拋出一個錯誤。如果 token 有效，則此方法將返回解碼的 token。


    */
  public static verifyToken = (token: string): boolean => {
    if (jwt.verify(token, process.env.JWT_SECRET)) return true;
  };

  /* 
    jwt.decode(token, options): 此方法只解碼 token，並返回解碼的 payload。它不驗證 token 的簽名。這意味著，即使 token 是無效的，只要它有正確的格式，此方法仍然可以解碼它。因此，你應該只在你確信 token 是有效的情況下使用此方法。
  */
  public static decodeToken = (
    token: string
  ): string | jwt.JwtPayload | null => {
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
