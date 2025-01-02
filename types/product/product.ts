export interface IProduct {
    photo: any;
    product_name: string;
    buying_price: number;
    selling_price: number;
    createdAt: string;
    quantity: number;
    category: string;
    supplier: string; 
}

export interface Link{
    next: null | string,
    previous: null | string
}
export interface ProductResponse{
    count: number,
    data: IProduct[],
    links: Link
}

export interface ProductState {
    products: ProductResponse | null,
    loading: boolean,
    error: null | string | any
}
