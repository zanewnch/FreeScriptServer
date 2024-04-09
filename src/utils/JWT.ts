
import jwt from "jsonwebtoken";

export class JWT {
    public static createToken = (username: string) => {
        const payload = {
            sub: '1234567890',
            name: username,
            iat: 1516239022
          };
        // return jwt.sign(payload, process.env.JWT_SECRET, {
        // expiresIn: "240h",
        // });
        return jwt.sign(payload, process.env.JWT_SECRET);
    };
    
    public static verifyToken = (token: string) => {
        if( jwt.verify(token, process.env.JWT_SECRET)) return true;
    };

    public static decodeToken = (token: string) => {
        return jwt.decode(token);
    };

    public static getPayload = (token: string) => {
        return jwt.decode(token);
    };

    
    public static getExpireTime = (token: string) => {
        const payload = JWT.getPayload(token);
        if (payload && typeof payload !== 'string') {
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