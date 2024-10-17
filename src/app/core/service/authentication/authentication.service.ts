import {Injectable} from '@angular/core';
import {createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, UserCredential} from "firebase/auth";
import {getDatabase, ref, set} from 'firebase/database';
import {User} from "../../model/user";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor() {
  }

  public signUpWithEmailAndPassword(user: User): Promise<boolean | unknown> {
    const database = getDatabase();

    return new Promise((resolve, reject) => {
      createUserWithEmailAndPassword(getAuth(), user.email, user.password)
        .then((userCreated: UserCredential) => {

          set(ref(database, 'users/' + userCreated.user.uid), {
            email: user.email,
            userName: user.userName,
            phone: user.phone,
            password: user.password,
          }).then(() => resolve(true))
            .catch((error) => {
              console.error(error);
              reject(false)
            });

        }).catch((error) => {
        console.error(error);
        reject(error)
      });
    });
  }

  public signInWithEmailAndPassword(user: Partial<User>): Promise<UserCredential> {
    return signInWithEmailAndPassword(getAuth(), user.email as string, user.password as string);
  }
}
