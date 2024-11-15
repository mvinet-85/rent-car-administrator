import {Injectable} from '@angular/core';
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  UserCredential
} from "firebase/auth";
import {getDatabase, ref, set,} from 'firebase/database';
import {FirebaseUser, User} from "../../model/user";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private firebaseUser: FirebaseUser | null = null;

  constructor(private router: Router) {
    this.initAuthListener();
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
              reject(false);
            });

        }).catch((error) => {
        console.error('Erreur lors de la création de l\'utilisateur : ', error);
        reject(error);
      });
    });
  }

  public signInWithEmailAndPassword(user: Partial<User>): Promise<UserCredential> {
    return signInWithEmailAndPassword(getAuth(), user.email as string, user.password as string);
  }

  public getUser(): FirebaseUser | null {
    return this.firebaseUser ? this.firebaseUser : JSON.parse(localStorage.getItem('firebaseUser') || 'null');
  }

  public isAuthenticated(): boolean {
    return this.getUser() !== null;
  }

  public signOut(): void {
    const auth = getAuth();
    signOut(auth).then(() => {
      this.clearToken();
      this.router.navigate(['/login']);
    });
  }

  private initAuthListener() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user: FirebaseUser | null) => {
      if (user) {
        this.firebaseUser = {uid: user.uid, email: user.email};
        localStorage.setItem('firebaseUser', JSON.stringify(this.firebaseUser));
      } else {
        this.firebaseUser = null;
        localStorage.removeItem('firebaseUser');
      }
    });
  }

  private clearToken() {
    localStorage.removeItem('firebaseUser');
    this.firebaseUser = null;
  }
}
