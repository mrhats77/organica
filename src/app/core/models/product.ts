
export interface IProduct{
    id: number | null;
    title: string;
    price?: number;
    categoryId?: number;
    category?: string;
    searchKey?: string[];
    quantityInStock?: number;
    description?: string;
    imageUrl: string;
    [key: string]: any;
}