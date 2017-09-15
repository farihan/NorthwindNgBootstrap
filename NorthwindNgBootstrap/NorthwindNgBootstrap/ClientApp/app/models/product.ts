export interface Product {
    productId: number;
    productName: string;
    quantityPerUnit: string;
    unitPrice: number;
    unitsInStock: number;
    unitsOnOrder: number;
    reorderLevel: number;
    discontinued: boolean;
    supplierId: number;
    categoryId: number;
}