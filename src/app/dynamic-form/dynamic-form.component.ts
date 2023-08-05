import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { CurdService, Project } from '../serives/curd.service';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss']
})
export class DynamicFormComponent {
  projectForm: FormGroup;
  selectedFile: File | null = null;

  constructor(
    private fb: FormBuilder,
    private curdService: CurdService,
    public dialogRef: MatDialogRef<DynamicFormComponent>
  ) {
    this.projectForm = this.fb.group({
      projectName: ['', Validators.required],
      description: ['', Validators.required],
      link: ['', Validators.required],
      imageUrl: ['']  // Initialize imageUrl in the form
    });
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  upload() {
    if (!this.projectForm.valid || !this.selectedFile) {
      return;
    }
    this.dialogRef.close();
    const collectionName = 'projects';
    const filePath = `projects/${this.selectedFile.name}`;
    const task = this.curdService.uploadFile(collectionName, filePath, this.selectedFile);
    task.snapshotChanges().toPromise()
      .then((snapshot: any) => snapshot.ref.getDownloadURL())
      .then(downloadURL => {
        this.projectForm.patchValue({ imageUrl: downloadURL });
        const formValues = this.projectForm.value;
        const newProject: Project = {
          ...formValues,
        };
        return this.curdService.addProject(collectionName, newProject); // Pass the collection name here
      })
      .then(() => {
        console.log('Project added successfully with image URL');
      })
      .catch(error => {
        console.error('Error uploading and adding project:', error);
      });
  }
}
