
export interface ColorRequired {
  readonly name : string;
}

export interface ColorOptional {
  readonly id : string;
  readonly state: boolean;
}

export type ColorProperties = ColorRequired & Partial<ColorOptional>

export type ColorPropertiesUpdate = Partial<Omit<ColorRequired, ''>> & Partial<Pick<ColorOptional, 'state' | 'id' >>;

export class Color {
    private readonly id : string;
    private name : string;
    private state: boolean;

    constructor(properties: ColorProperties | ColorPropertiesUpdate) {
        Object.assign(this, properties);

    }

    properties () : ColorProperties {
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
  
    update(fields: ColorPropertiesUpdate) {
      const fieldsFiltered = Object.fromEntries(
        Object.entries(fields).filter(([_, v]) => v !== null),
      );
      return Object.assign(this, fieldsFiltered);
      //this.updatedAt = new Date();
    }
}

