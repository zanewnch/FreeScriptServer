import { Request } from 'express';

export interface User extends Request {
    
        id: number;
        username: string;
        password: string;
        registrationDate: Date | null;
        lastLoginDate: Date | null;
        userStatus: string;
    
}
