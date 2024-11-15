export interface User {
  userName: string,
  email: string,
  phone: string,
  password: string
}

export interface FirebaseUser {
  uid: string;
  email: string | null;
}
