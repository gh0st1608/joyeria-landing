export interface ContactRequired {
  readonly name : string;
  readonly subject: string;
  readonly message : string;
  readonly email : string;
}

export interface ContactOptional {
  readonly id : string;
  readonly phone: string;
  readonly active: boolean;
}

export type ContactProperties = ContactRequired & Partial<ContactOptional>

export type ContactPropertiesUpdate = Partial<Omit<ContactRequired, ''>> & Partial<Pick<ContactOptional, 'active' | 'phone' | 'id' >>;

export class Contact {
    private readonly id : string;
    private name: string;
    private subject : string;
    private message : string;
    private phone: string;
    private email: string;
    private active: boolean
    

    constructor(properties: ContactProperties) {
        Object.assign(this, properties);

    }

    properties () : ContactProperties {
      return {
          id : this.id,
          name : this.name,
          subject: this.subject,
          message: this.message,
          phone: this.phone,
          email: this.email,
          active: this.active

      }
    }

    delete() {
      this.active = false;
      //this.deletedAt = new Date();
    }
  
    update(fields: ContactPropertiesUpdate) {
      const fieldsFiltered = Object.fromEntries(
        Object.entries(fields).filter(([_, v]) => v !== null),
      );
      return Object.assign(this, fieldsFiltered);
      //this.updatedAt = new Date();
    }
}
    
    