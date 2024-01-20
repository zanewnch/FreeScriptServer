import { Request } from 'express';
import { SupermarketSale } from './SupermarketSale';
export interface SupermarketSaleRes extends Request {
    body: SupermarketSale;
}
