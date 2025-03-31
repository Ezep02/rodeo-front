export interface User {
  ID?: string,
  name: string;
  email: string;
  password: string;
  is_admin?: boolean;
  is_barber?:boolean;
  surname: string;
  phone_number?: string;
}

export interface LoginUserReq {
  email?: string;
  password: string;
}

export interface LoginUserRes {
  user: User; 
}



