import {Request} from 'express';
import { User } from './User';

export interface UserRes extends Request{
    body: User;
}