export interface IChart {
  label: string;
  value: number;
}

export interface ICashSell {
  customerId: string;
  saleAmount: number;
  collectedAmount: number;
  createdAt: string;
  dueAmount: number;
  extraAmount: number;
  description: string;
  id: string;
}
