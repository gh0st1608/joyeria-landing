
import { Product } from '../entities/product.entity';

export interface IProductRepository {
    create(product: Product): Promise<Product>;
    findAll(): Promise<Product[]>;
    findByParams(filters: Record<string, string>): Promise<Product[]>;
    getProduct(id : string): Promise<Product>;
    /* update(product: Product): Promise<Product>; */
    delete(id: string): Promise<void>;
}