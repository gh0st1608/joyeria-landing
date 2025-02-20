
import { CategoryProduct } from '../entities/category-product.entity';

export interface ICategoryProductRepository {
    create(categoryProduct: CategoryProduct): Promise<CategoryProduct>;
    findAll(): Promise<CategoryProduct[]>;
    /* update(id : string ,categoryProduct: CategoryProduct): Promise<CategoryProduct>; */
    delete(id: string): Promise<void>;
}