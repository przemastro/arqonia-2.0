export class User {
  username: string;
  password: string;
  email: string;
  roles: Array<UserRole>
}

export class UserRole {
  name: RoleType;
}

export enum RoleType {
  ADMIN, USER
}
