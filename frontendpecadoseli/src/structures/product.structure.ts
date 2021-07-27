export interface Product{
    productID?: string;
    categoryID ?: string;
    categoryname ?: string;
    name? : string;
    description? : string;
    unitPrice? : number;
    url_image? : string
    list_images ?: string[];
    is_ordenate?: boolean;
}

export interface Product_sales{
    productID: string;
    categoryname : string;
    name : string;
    unitPrice : number;
    url_image : string
    sales: number;
}