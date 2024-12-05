export interface Customer {
    id: string;
    name: string;
    email: string;
    phone: string;
    address: string;
    createdAt: string;
    profile_photo: string;
  }


  export interface CustomerState {
    customer: [];
    loading: boolean;
    error: null | any;
  }