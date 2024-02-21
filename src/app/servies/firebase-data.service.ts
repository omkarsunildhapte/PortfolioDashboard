import { Injectable, inject } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, doc, updateDoc } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseDataService {
  private firestore = inject(Firestore);
  private mySelfCollection = collection(this.firestore, 'mySelf');
  private myfactsCollection = collection(this.firestore, 'myfacts');
  private myskillsCollection = collection(this.firestore, 'myskills');
  private myEducationCollection = collection(this.firestore, 'myEdcation');
  private myExperienceCollection = collection(this.firestore, 'myExperience');
  private myCourseCollection = collection(this.firestore, 'myCourse');

  getmySelfCollection() {
    return collectionData(this.mySelfCollection, { idField: 'id' }) as Observable<any>
  }
  getmyFactCollection() {
    return collectionData(this.myfactsCollection) as Observable<any>
  }
  getmySkillsCollection() {
    return collectionData(this.myskillsCollection) as Observable<any>
  }
  getMyEducationCollection() {
    return collectionData(this.myEducationCollection) as Observable<any>
  }
  getMyExperienceCollection() {
    return collectionData(this.myExperienceCollection) as Observable<any>
  }
  getMyCourseCollection() {
    return collectionData(this.myCourseCollection) as Observable<any>
  }
  addMyCollection(values: any) {
    return of(addDoc(this.mySelfCollection, values))
  }
  addMyEducationCollection(values: any) {
    return of(addDoc(this.myEducationCollection, values))
  }
  addmyExperienceCollection(values: any) {
    return of(addDoc(this.myExperienceCollection, values))
  }
  addmyCourseCollection(values: any) {
    return of(addDoc(this.myCourseCollection, values))
  }
  updateMySelfCollection(dock: any, id: any) {
    const docRef = doc(this.firestore, 'mySelf', id);
    return updateDoc(docRef, { ...dock })
  }
}
