export interface User {
  ID: number,
  name: string;
  email: string;
  password: string;
  is_admin?: boolean;
  is_barber?:boolean;
  surname: string;
  phone_number: string;
}

export interface RegisterUserReq {
  name: string;
  surname: string;
  email: string;
  password: string;
  phone_number: string;
}

export interface RegisterPaymentReq {
  
  name: string;
  surname: string;
  email: string;
  phone_number: string;
}



export interface SendEmailForData {
  email: string
}

export interface LoginUserReq {
  email?: string;
  password: string;
}

export interface LoginUserRes {
  user: User; 
}



