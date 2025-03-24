export interface PaymentRequired {
    readonly methodPayment : string;
    readonly payerId : string;
    readonly bank : string;
    readonly amount: number;
    readonly currency: string;
    readonly orderId : string;
    readonly userId : string;
  }
  
export interface PaymentOptional {
    readonly id : string;
    readonly status : string;
    readonly createTime : Date;
}

export type PaymentProperties = PaymentRequired & Partial<PaymentOptional>
export type PaymentPropertiesUpdate = Partial<Omit<PaymentRequired, ''>> & Partial<Pick<PaymentOptional, 'id' | 'createTime' | 'status'>>;
//export type PaymentPropertiesUpdate = Partial<PaymentProperties>;

export class Payment {
    private readonly id : string;
    private bank: string;
    private orderId: string;
    private methodPayment : string;
    private payerId : string;
    private amount : number;
    private currency: string;
    private userId : string;
    private status : string;
    private createTime : Date;
  
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
          payerId: this.payerId,
          amount: this.amount,
          currency: this.currency,
          status: this.status,
          userId: this.userId,
          createTime : this.createTime
      }
    }

    update (propertiesUpdated : PaymentPropertiesUpdate ) : Payment {
        return Object.assign(this, propertiesUpdated);
    }
}