import { Injectable } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/compat/storage';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CurdService {
  private projectsCollection!: AngularFirestoreCollection<any>;
  private projects$!: Observable<any>;

  constructor(private afs: AngularFirestore, private storage: AngularFireStorage) { }

  getProjects(collectionName: string): Observable<any> {
    this.projectsCollection = this.afs.collection<any>(collectionName);
    this.projects$ = this.projectsCollection.valueChanges({ idField: 'id' });
    return this.projects$;
  }

  addProject(collectionName: string, project: any): Promise<DocumentReference<any>> {
    const collection = this.afs.collection<any>(collectionName);
    return collection.add(project);
  }


  uploadFile(collectionName: string, filePath: string, file: File): AngularFireUploadTask {
    const collection = this.afs.collection<any>(collectionName);
    const task = this.storage.upload(filePath, file);
    return task;
  }
}
