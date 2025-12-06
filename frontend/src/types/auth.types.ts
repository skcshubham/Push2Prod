export interface SignUpData {
  firstName: string;
  lastName: string;
  emailId: string;
  password: string;
}

export interface LoginData {
  emailId: string;
  password: string;
}

export interface AuthResponse {
  message: string;
  data: object;
}
