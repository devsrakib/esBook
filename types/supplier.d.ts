export interface Supplier {
    id: string;
    name: string;
    email: string;
    phone: string;
    address: string;
    createdAt: string;
    profile_photo: string;
  }


  export interface SupplierState {
    supplier: [];
    loading: boolean;
    error: null | any;
  }