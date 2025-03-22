import { Itembuy } from "../../../itembuy/domain/entities/itembuy.entity";

export interface CartbuyRequired {
  readonly items: Itembuy[]
  readonly totalAmount : number;
}

export interface CartbuyOptional {
  readonly id : string;
  readonly active: boolean;
}

export type CartbuyProperties = CartbuyRequired & Partial<CartbuyOptional>

export type CartbuyPropertiesUpdate = Partial<Omit<CartbuyRequired, ''>> & Partial<Pick<CartbuyOptional, 'active' | 'id' >>;

export class Cartbuy {
    private readonly id : string;
    private items : Itembuy[];
    private totalAmount : number;
    private active: boolean;

    constructor(properties: CartbuyProperties) {
        this.active = true;
        Object.assign(this, properties);

    }

    properties () : CartbuyProperties {
      return {
          id : this.id,
          items: this.items,
          totalAmount: this.totalAmount,
          active: this.active,

      }
    }

    delete() {
      this.active = false;
      //this.deletedAt = new Date();
    }
}
    
