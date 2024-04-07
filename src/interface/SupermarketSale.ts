export interface SupermarketSale {
  id: number;
  branch: string;
  city: string;
  customerType: string;
  gender: string;
  productLine: string;
  unitPrice: number;
  quantity: number;
  tax5Percent: number;
  total: number;
  date: Date | null;
  time: Date | null;
  payment: string;
  cogs: number;
  grossMarginPercentage: number;
  grossIncome: number;
  rating: number;
}
