
import { Material } from '../entities/material.entity';

export interface IMaterialRepository {
    create(material: Material): Promise<Material>;
    findAll(): Promise<Material[]>;
    /* update(id : string ,categoryProduct: Material): Promise<Material>; */
    delete(id: string): Promise<void>;
}