
import { Color } from '../entities/color.entity';

export interface IColorRepository {
    create(color: Color): Promise<Color>;
    findAll(): Promise<Color[]>;
    /* update(id : string ,categoryProduct: Color): Promise<Color>; */
    delete(id: string): Promise<void>;
}