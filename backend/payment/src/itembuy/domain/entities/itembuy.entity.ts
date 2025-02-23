export interface ItembuyRequired {
    readonly price : number;
    readonly quantity : number;
    readonly productId: string;
  }
  
export interface ItembuyOptional {
    readonly id : string;
    readonly active: boolean;
}

export type ItembuyProperties = ItembuyRequired & Partial<ItembuyOptional>

export type ItembuyPropertiesUpdate = Partial<Omit<ItembuyRequired, ''>> & Partial<Pick<ItembuyOptional, 'active' | 'id' >>;


export class Itembuy {
    private readonly id : string;
    private productId : string;
    private price : number;
    private quantity: number;
    private active: boolean
  
    constructor(properties: ItembuyProperties) {
        Object.assign(this, properties);
  
    }
  
    properties () : ItembuyProperties {
      return {
          id : this.id,
          productId: this.productId,
          price: this.price,
          quantity: this.quantity,
          active: this.active
      }
    }
  
    delete() {
      this.active = false;
      //this.deletedAt = new Date();
    }
}