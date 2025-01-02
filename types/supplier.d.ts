export interface Supplier {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  createdAt: string;
  profile_photo: string;
}


// types/customer.ts
export interface Supplier {
id: string;
name: string;
email: string;
phone: string;
profile_photo: string | null;
createdAt: string;
}

export interface Links {
next: string | null;
previous: string | null;
}

export interface SupplierResponse {
count: number;
data: Supplier[];
links: Links;
}

export interface SupplierState {
suppliers: SupplierResponse | null; // State will hold the API response or null
loading: boolean;
error: string | null;
}

