export interface PaymentRequired {
    readonly methodPayment : string;
    readonly bank : string;
    readonly orderId : string;
    readonly userId : string;
  }
  
export interface PaymentOptional {
    readonly id : string;
    readonly status : string;
    readonly created_at : Date;
}

export type PaymentProperties = PaymentRequired & Partial<PaymentOptional>
export type PaymentPropertiesUpdate = Partial<Omit<PaymentRequired, ''>> & Partial<Pick<PaymentOptional, 'id' | 'created_at' | 'status'>>;
//export type PaymentPropertiesUpdate = Partial<PaymentProperties>;

export class Payment {
    private readonly id : string;
    private bank: string;
    private orderId: string;
    private methodPayment : string;
    private userId : string;
    private status : string;
    private created_at : Date;
  
    constructor(properties: PaymentProperties) {
        this.status = 'INITIALIZED' 
        Object.assign(this, properties);
    }
  
    properties () : PaymentProperties {
      return {
          id : this.id,
          bank: this.bank,
          orderId: this.orderId,
          methodPayment: this.methodPayment,
          status: this.status,
          userId: this.userId,
          created_at : this.created_at
      }
    }

    update (propertiesUpdated : PaymentPropertiesUpdate ) : Payment {
        return Object.assign(this, propertiesUpdated);
    }
}