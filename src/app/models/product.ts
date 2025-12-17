export interface Product {
    id: string;
    title: string;
    slug: string
    price: number;
    images: string[];
    description: string;
    category: Category;
    taxes?: number;
    
}

export interface Category {
    id: string;
    name: string;
}


export interface CreateProductDTO extends Omit<Product, 'id' | 'category'| 'slug'> {
    categoryId: number;
}


// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface UpdateProductDTO extends Partial<CreateProductDTO> { }


