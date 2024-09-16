export type TransactionData = {
  customerId?: string | number; // Assuming customerId can be either a string (UUID) or number
  supplierId?: string | number;
  saleAmount: number;
  collectedAmount: number;
  dueAmount: number;
  extraAmount: number;
  description?: string; // Optional field
  amount: number;
  id: number | string;
};
