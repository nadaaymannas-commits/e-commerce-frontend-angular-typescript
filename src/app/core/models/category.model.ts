export interface ICategory {
    _id: string;
    name: string;
    isActive: boolean;
    isDeleted: boolean;
    createdAt?: string;
    updatedAt?: string;
}

export interface ICategoriesListRes {
    message: string;
    data: ICategory[];
}

export interface ICategoryRes {
    message: string;
    data: ICategory;
}