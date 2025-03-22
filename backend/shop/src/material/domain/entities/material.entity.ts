
export interface MaterialRequired {
  readonly name : string;
}

export interface MaterialOptional {
  readonly id : string;
  readonly state: boolean;
}

export type MaterialProperties = MaterialRequired & Partial<MaterialOptional>

export type MaterialPropertiesUpdate = Partial<Omit<MaterialRequired, ''>> & Partial<Pick<MaterialOptional, 'state' | 'id' >>;

export class Material {
    private readonly id : string;
    private name : string;
    private state: boolean;

    constructor(properties: MaterialProperties | MaterialPropertiesUpdate) {
        Object.assign(this, properties);

    }

    properties () : MaterialProperties {
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
  
    update(fields: MaterialPropertiesUpdate) {
      const fieldsFiltered = Object.fromEntries(
        Object.entries(fields).filter(([_, v]) => v !== null),
      );
      return Object.assign(this, fieldsFiltered);
      //this.updatedAt = new Date();
    }
}

