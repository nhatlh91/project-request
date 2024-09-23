import {Injectable} from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";

const collection = 'off-requests';

@Injectable({
  providedIn: 'root'
})
export class OffRequestService {

  constructor(private afs: AngularFirestore) {
  }

  getOffRequests(status: string) {
    return new Promise<any[]>((resolve) => {
      this.afs.collection(collection, ref => ref.where('status', '==', status).orderBy('created', 'desc')).valueChanges({idField: 'uid'}).subscribe(requests => resolve(requests));
    });
  }

  createOffRequest(request: OffRequest) {
    this.afs.collection(collection).add(request);
  }

  updateOffRequest(request: OffRequest) {
    this.afs.collection(collection).doc(request.uid).update(request);
  }

  deleteOffRequests(id: string) {
    this.afs.doc(`${collection}/${id}`).delete();
  }
}

export interface OffRequest {
  uid: string;
  category: string;
  status: string;
  created: Date;
  begin: Date;
  end: Date;
  hours: number;
  requester: string;
  requesterId: string;
  dept: string;
  deptId: string;
  reason: string;
  neededApproves: string;
  pendingApproves: string;
  comment: string;
}
