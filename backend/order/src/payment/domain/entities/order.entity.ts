export interface OrderRequired {
    readonly purchase_units : any;
    readonly intent : string;
  }
  
export interface OrderOptional {
    readonly id : string;
    readonly application_context : { return_url : string, cancel_url : string };
}

export interface PurchaseUnitRequired {
    readonly amount : AmountRequired;
    
}

export interface PurchaseUnitOptional {
    readonly items : Array<ItemsRequired>;
}

export interface ItemsRequired {
    readonly name : string;
    readonly quantity : string;
    readonly unit_amount : string;
}

export interface AmountRequired {
    readonly currency_code : string;
    readonly value : string;
}

export type PurchaseUnitProperties = PurchaseUnitRequired & PurchaseUnitOptional

export type OrderProperties = OrderRequired & Partial<OrderOptional>
export type OrderPropertiesUpdate = Partial<Omit<OrderRequired, ''>> & Partial<Pick<OrderOptional,'id' | 'application_context' >>;

export class PurchaseUnit {
  private readonly items : ItemsRequired[];
  private readonly amount : AmountRequired;

  constructor(properties: PurchaseUnitProperties) {
    Object.assign(this, properties);
  }
  
  properties () : PurchaseUnitProperties {
    return {
      items : this.items,
      amount: this.amount
    }
  }
}

export class Order {
    private readonly id : string;
    private purchase_units : PurchaseUnit[];
    private intent : string;
    private application_context : { return_url : string, cancel_url : string };
  
    constructor(properties: OrderProperties) {
        Object.assign(this, properties);
  
    }
  
    properties () : OrderProperties {
      return {
          id : this.id,
          purchase_units: this.purchase_units,
          intent: this.intent,
          application_context : this.application_context
      }
    }
}