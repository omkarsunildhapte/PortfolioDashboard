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

  deleteProject(collectionName: string, projectId: string): Promise<void> {
    const collection = this.afs.collection<any>(collectionName);
    const projectDoc = collection.doc(projectId);
    return projectDoc.delete();
  }

  uploadFile(collectionName: string, filePath: string, file: File): AngularFireUploadTask {
    const collection = this.afs.collection<any>(collectionName);
    const task = this.storage.upload(filePath, file);
    return task;
  }
  editProjects(collectionName: string, projectId: string, updatedProject: any, newImageFile: File): Promise<string> {
    const collection = this.afs.collection<any>(collectionName);
    const projectDoc = collection.doc(projectId);
    const storageRef = this.storage.ref(`projects/${newImageFile.name}`);
    const uploadTask = storageRef.put(newImageFile);
    return uploadTask.snapshotChanges().toPromise()
      .then((snapshot: any) => snapshot.ref.getDownloadURL())
      .then(newImageUrl => {
        updatedProject.imageUrl = newImageUrl;
        return projectDoc.update(updatedProject);
      })
      .then(() => {
        return updatedProject.imageUrl;
      })
  }
}
