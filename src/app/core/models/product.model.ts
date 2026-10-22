import { ICategory } from './category.model'; // تأكدي إن المسار صح

export interface IProduct {
    _id: string;
    name: string;
    price: number;
    desc: string;
    stock: number;
    slug: string;
    imgURL: string;
    gender: "men" | "women" | "unisex";
    category: ICategory | string | any;
    subCategory: any | string;
    isActive: boolean;
    isDeleted: boolean;
    isTrending: boolean;
    season?: string;
    size?: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface IProductsListRes {
    message: string;
    results: number;
    totalProducts: number;
    currentPage: number;
    totalPages: number;
    data: IProduct[];
}

export interface IProductRes {
    message: string;
    data: IProduct;
}