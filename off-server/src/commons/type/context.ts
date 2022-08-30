export interface IUser {
  user: {
    email: string;
    id: string;
    exp?: string;
    cookie?: string;
  };
}

export interface IContext {
  req?: Request & IUser;
  res?: Response;
}
