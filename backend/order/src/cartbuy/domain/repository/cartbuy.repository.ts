
import { Cartbuy } from '../../domain/entities/cartbuy.entity';

export interface ICartbuyRepository {
    getList(): Promise<Cartbuy[]>;
    get(id: string): Promise<Cartbuy>;
    create(product: Cartbuy): Promise<Cartbuy>;
    delete(id: string): Promise<void>;
}