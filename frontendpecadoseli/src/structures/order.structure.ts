export interface Order{
    'orderID': string;
    'userID'?: number;
    'username'?: string;
    'date': Date;
    'lat'?: number;
    'lon'?: number;
    'status': boolean;
}

export interface Detail{
    'detailID': string;
    'orderID': string;
    'productID': string;
    'unitPrice': Number;
    'quantity': Number;
    'discount': Number;
}