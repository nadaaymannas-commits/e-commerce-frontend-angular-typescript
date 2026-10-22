export interface IUser {
  _id: string;
  name: string;
  email: string;
  role: string;
  isActive: boolean;
  isDeleted: boolean;
}

export interface IUserListRes {
  message: string;
  results?: number;
  data: IUser[];
}