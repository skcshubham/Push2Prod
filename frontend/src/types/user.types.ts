export interface User {
  _id: string;
  firstName: string;
  lastName?: string;
  emailId: string;
  age?: number;
  gender?: string;
  photoUrl?: string;
  about?: string;
  skills?: string[];
  password?: string;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}
