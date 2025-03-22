
export interface CategoryProductRequired {
  readonly name : string;
}

export interface CategoryProductOptional {
  readonly id : string;
  readonly state: boolean;
}

export type CategoryProductProperties = CategoryProductRequired & Partial<CategoryProductOptional>

export type CategoryProductPropertiesUpdate = Partial<Omit<CategoryProductRequired, ''>> & Partial<Pick<CategoryProductOptional, 'state' | 'id' >>;

export class CategoryProduct {
    private readonly id : string;
    private name : string;
    private state: boolean;

    constructor(properties: CategoryProductProperties | CategoryProductPropertiesUpdate) {
        Object.assign(this, properties);

    }

    properties () : CategoryProductProperties {
      return {
          id : this.id,
          name : this.name,
          state: this.state,

      }
    }

    delete() {
      this.state = false;
      //this.deletedAt = new Date();
    }
  
    update(fields: CategoryProductPropertiesUpdate) {
      const fieldsFiltered = Object.fromEntries(
        Object.entries(fields).filter(([_, v]) => v !== null),
      );
      return Object.assign(this, fieldsFiltered);
      //this.updatedAt = new Date();
    }
}

