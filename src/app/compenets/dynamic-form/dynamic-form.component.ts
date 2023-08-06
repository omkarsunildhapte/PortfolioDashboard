import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CurdService } from '../../shared/curd/curd.service';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss']
})
export class DynamicFormComponent {
  projectForm!: FormGroup;
  serviceForm!: FormGroup;
  skillsForms!: FormGroup;
  clients!: FormGroup;
  certificates!: FormGroup;
  selectedFile: File | null = null;

  constructor(
    private fb: FormBuilder,
    private curdService: CurdService,
    public dialogRef: MatDialogRef<DynamicFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }
  ngOnInit() {
    this.serviceForm = this.fb.group({
      iconName: ['', Validators.required],
      serviceName: ['', Validators.required],
      serviceDescription: ['', Validators.required],
    });
    this.projectForm = this.fb.group({
      projectName: ['', Validators.required],
      description: ['', Validators.required],
      link: ['', Validators.required],
      imageUrl: ['']
    }); this.skillsForms = this.fb.group({
      skilleName: ['', Validators.required],
      imageUrl: [''],
      expirationDate: [null, Validators.required],
      someDate: [null, Validators.required]
    });
    this.clients = this.fb.group({
      formName: ['', Validators.required],
      imageUrl: ['']
    });
    this.certificates = this.fb.group({

    })
  }
  onSubmit() {
    if (this.serviceForm.valid) {
      console.log(this.serviceForm.value);
      this.curdService.addProject('serives', this.serviceForm.value);
      this.dialogRef.close();
      this.serviceForm.reset();
    }
  }
  Clients() {

    if (!this.clients.valid || !this.selectedFile) {
      return;
    }
    debugger
    this.dialogRef.close();
    const collectionName = 'clients';
    const filePath = `clients/${this.selectedFile.name}`;
    const task = this.curdService.uploadFile(collectionName, filePath, this.selectedFile);
    task.snapshotChanges().toPromise()
      .then((snapshot: any) => snapshot.ref.getDownloadURL())
      .then(downloadURL => {
        this.clients.patchValue({ imageUrl: downloadURL });
        const formValues = this.clients.value;
        const newProject: any = {
          ...formValues,
        };
        return this.curdService.addProject(collectionName, newProject);
      })
      .then(() => {
        console.log('Project added successfully with image URL');
      })
      .catch(error => {
        console.error('Error uploading and adding project:', error);
      });
  }
  Certificates() {
    if (!this.certificates.valid || !this.selectedFile) {
      return;
    }
    debugger
    this.dialogRef.close();
    const collectionName = 'certificates';
    const filePath = `certificates/${this.selectedFile.name}`;
    const task = this.curdService.uploadFile(collectionName, filePath, this.selectedFile);
    task.snapshotChanges().toPromise()
      .then((snapshot: any) => snapshot.ref.getDownloadURL())
      .then(downloadURL => {
        this.certificates.patchValue({ image: downloadURL });
        const formValues = this.certificates.value;
        const newProject: any = {
          ...formValues,
        };
        return this.curdService.addProject(collectionName, newProject);
      })
      .then(() => {
        console.log('Project added successfully with image URL');
      })
      .catch(error => {
        console.error('Error uploading and adding project:', error);
      });
  }
  addSkills() {
    if (!this.skillsForms.valid || !this.selectedFile) {
      return;
    }
    this.dialogRef.close();
    const collectionName = 'skills';
    const filePath = `skills/${this.selectedFile.name}`;
    const task = this.curdService.uploadFile(collectionName, filePath, this.selectedFile);
    task.snapshotChanges().toPromise()
      .then((snapshot: any) => snapshot.ref.getDownloadURL())
      .then(downloadURL => {
        this.skillsForms.patchValue({ imageUrl: downloadURL });
        const formValues = this.skillsForms.value;
        const newProject: any = {
          ...formValues,
        };
        return this.curdService.addProject(collectionName, newProject);
      })
      .then(() => {
        console.log('Project added successfully with image URL');
      })
      .catch(error => {
        console.error('Error uploading and adding project:', error);
      });
  }

  onFileSelected(event: any) {
    debugger
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
        const newProject: any = {
          ...formValues,
        };
        return this.curdService.addProject(collectionName, newProject);
      })
      .then(() => {
        console.log('Project added successfully with image URL');
      })
      .catch(error => {
        console.error('Error uploading and adding project:', error);
      });
  }
}
