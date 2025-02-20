
import { Product } from '../entities/product.entity';

export interface IProductRepository {
    create(product: Product): Promise<Product>;
    findAll(): Promise<Product[]>;
    /* update(product: Product): Promise<Product>; */
    delete(id: string): Promise<void>;
}