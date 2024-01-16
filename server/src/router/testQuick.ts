import express from 'express';
import { test } from '../controller/testQuick';

const router = express.Router();

export default (router: express.Router) => {
    
    router.get('/test', test);
    
}

