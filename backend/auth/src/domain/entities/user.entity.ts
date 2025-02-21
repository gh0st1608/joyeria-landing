export interface UserRequired {
  readonly name: string;
  readonly lastname: string;
  readonly email: string;
  readonly password: string;
  //readonly roles: string[] | unknown[];
}

export interface UserOptional {
  readonly id: string;
  readonly photo: string;
  readonly active: boolean;
  readonly refreshToken: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly deletedAt: Date;
}

export type UserProperties = UserRequired & Partial<UserOptional>;

export type UserPropertiesUpdate = Partial<
  Omit<UserRequired, 'email'> & Pick<UserOptional, 'photo'>
>;

export class User {
  private readonly id: string;
  private name: string;
  private lastname: string;
  private readonly email: string;
  private password: string;
  private photo: string;
  private roles: string[] | unknown[];
  private active: boolean;
  private refreshToken: string;
  private readonly createdAt: Date;
  private updatedAt: Date | null;
  private deletedAt: Date | null;

  constructor(properties: UserProperties) {
    this.active = true
    Object.assign(this, properties);
  }

  properties(): UserProperties {
    return {
      id: this.id,
      name: this.name,
      lastname: this.lastname,
      email: this.email,
      password: this.password,
      photo: this.photo,
      //roles: this.roles,
      active: this.active,
      refreshToken: this.refreshToken,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      deletedAt: this.deletedAt,
    };
  }
}