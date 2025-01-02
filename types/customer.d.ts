export interface Customer {
    id: string;
    name: string;
    email: string;
    phone: string;
    address: string;
    createdAt: string;
    profile_photo: string;
  }


  // types/customer.ts
export interface Customer {
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

export interface CustomerResponse {
  count: number;
  data: Customer[];
  links: Links;
}

export interface CustomerState {
  customers: CustomerResponse | null; // State will hold the API response or null
  loading: boolean;
  error: string | null;
}

  