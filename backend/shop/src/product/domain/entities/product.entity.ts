export interface ProductRequired {
  readonly title : string;
  readonly category: string;
  readonly material: string;
  readonly color: string[];
  readonly price : number;
  readonly description : string;
}

export interface ProductOptional {
  readonly id : string;
  readonly image: string;
  readonly discount: number;
  readonly state: boolean;
}

export type ProductProperties = ProductRequired & Partial<ProductOptional>

export type ProductPropertiesUpdate = Partial<Omit<ProductRequired, ''>> & Partial<Pick<ProductOptional, 'state' | 'id' >>;

export class Product {
    private readonly id : string;
    private title : string;
    private price : number;
    private state: boolean;
    private color: string[];
    private category: string;
    private material: string;
    private description: string;
    private discount: number;
    private image: string;

    constructor(properties: ProductProperties | ProductPropertiesUpdate) {
        Object.assign(this, properties);

    }

    properties () : ProductProperties {
      return {
          id : this.id,
          title : this.title,
          price: this.price,
          category: this.category,
          material: this.material,
          color: this.color,
          description: this.description,
          discount: this.discount,
          image: this.image,
          state: this.state,

      }
    }

    delete() {
      this.state = false;
      //this.deletedAt = new Date();
    }
  
    update(fields: ProductPropertiesUpdate) {
      const fieldsFiltered = Object.fromEntries(
        Object.entries(fields).filter(([_, v]) => v !== null),
      );
      return Object.assign(this, fieldsFiltered);
      //this.updatedAt = new Date();
    }
}
    
    