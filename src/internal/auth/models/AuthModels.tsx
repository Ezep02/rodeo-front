export interface User {
  id?: string,
  name: string;
  email: string;
  password: string;
  is_admin?: boolean;
  surname: string;
  phone_number?: string;
}

export interface LoginUserReq {
  email: string;
  password: string;
}

export interface LoginUserRes {
  user: User; 
}


