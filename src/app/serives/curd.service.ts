import { Injectable } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/compat/storage';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

export interface Project {
  id?: string;
  projectName: string;
  description: string;
  imageUrl: string;
  link: string;
}

@Injectable({
  providedIn: 'root'
})
export class CurdService {
  private projectsCollection!: AngularFirestoreCollection<Project>;
  private projects$!: Observable<Project[]>;

  constructor(private afs: AngularFirestore, private storage: AngularFireStorage) { }

  getProjects(collectionName: string): Observable<Project[]> {
    this.projectsCollection = this.afs.collection<Project>(collectionName);
    this.projects$ = this.projectsCollection.valueChanges({ idField: 'id' });
    return this.projects$;
  }

  addProject(collectionName: string, project: Project): Promise<DocumentReference<Project>> {
    const collection = this.afs.collection<Project>(collectionName);
    return collection.add(project);
  }

  uploadFile(collectionName: string, filePath: string, file: File): AngularFireUploadTask {
    const collection = this.afs.collection<Project>(collectionName);
    const task = this.storage.upload(filePath, file);
    return task;
  }
}
