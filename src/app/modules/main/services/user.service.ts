import {Injectable} from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {Observable} from "rxjs";

const collection = "users";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userMap = new Map<string, string>();

  constructor(private fireStore: AngularFirestore) {
    this.getAll().subscribe({
      next: value => {
        value.forEach(user => this.userMap.set(user.uid, user.fullName))
      }
    })
  }

  getAll(): Observable<User[]> {
    return this.fireStore.collection(collection).valueChanges({idField: 'uid'}) as Observable<User[]>;
  }

  getByUsername(username: string) {
    return this.fireStore.collection(collection, ref => ref.where('username', '==', username)).valueChanges({idField: 'uid'}) as Observable<User[]>;
  }

  save(user: User) {
    return this.fireStore.collection(collection).add(user);
  }

  update(user: User) {
    return this.fireStore.collection(collection).doc(user.uid).update(user);
  }

}

export interface User {
  uid: string;
  phone: string;
  password: string;
  role: string;
  fullName: string;
  dept: string;
  deptId: string;
  email: string;
}
