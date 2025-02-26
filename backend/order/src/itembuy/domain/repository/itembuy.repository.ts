
import { Itembuy } from '../entities/itembuy.entity';

export interface IItembuyRepository {
    getList(): Promise<Itembuy[]>;
    get(id: string): Promise<Itembuy>;
    create(product: Itembuy): Promise<Itembuy>;
    delete(id: string): Promise<void>;
}