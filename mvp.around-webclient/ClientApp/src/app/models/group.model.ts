export interface Group {
  id: number;
  label: string;
  password: string;
  userName: string;
  userRole: Role;
}

export enum Role {
  User = 0,
  Owner = 1
}