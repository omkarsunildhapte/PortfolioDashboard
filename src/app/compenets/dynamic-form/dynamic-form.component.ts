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
  Id: any;
  enddate = false;
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
    });
    this.skillsForms = this.fb.group({
      skilleName: ['', Validators.required],
      imageUrl: [''],
      expirationDate: ['', Validators.required],
      someDate: ['',],
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
    const data = { client: this.clients.value, file: this.selectedFile, id: this.Id }
    this.dialogRef.close(data);
  }
  Certificates() {
    if (!this.certificates.valid || !this.selectedFile) {
      return;
    }
    const data = { certificate: this.certificates.value, file: this.selectedFile }
    this.dialogRef.close(data);
  }
  addSkills() {
    if (!this.skillsForms.valid || !this.selectedFile) {
      return;
    }
    const data = { skill: this.skillsForms.value, file: this.selectedFile }
    this.dialogRef.close(data);
  }
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }
  upload() {
    if (!this.projectForm.valid || !this.selectedFile) {
      return;
    }
    const data = { project: this.projectForm.value, file: this.selectedFile, id: this.Id }
    this.dialogRef.close(data);
  }


  patchvalue() {
    if (this.data.data) {
      if (this.data.title == 'Servies') {
        this.serviceForm.patchValue({
          iconName: this.data.iconName,
          serviceName: this.data.serviceName,
          serviceDescription: this.data.serviceDescription
        });
      }
      else if (this.data.title == 'Project') {
        this.projectForm.patchValue({
          projectName: this.data.data.projectName,
          description: this.data.data.description,
          link: this.data.data.link,
        });
        this.selectedFile = this.data.data.imageUrl
        this.Id = this.data.data.id
      }
      else if (this.data.title == 'Skills') {
        const expirationDate = new Date(this.data.data.expirationDate);
        const someDate = new Date(this.data.data.someDate);
        this.skillsForms.patchValue({
          skilleName: this.data.data.skilleName,
          expirationDate: expirationDate,
          someDate: someDate
        });
        this.selectedFile = this.data.data.imageUrl
        this.Id = this.data.data.id
      }
      else if (this.data.title == 'Clients') {
        this.clients.patchValue({
          formName: this.data.data.formName,
          imageUrl: this.data.data.imageUrl
        });
        this.selectedFile = this.data.data.imageUrl;
        this.Id = this.data.data.id
      }
      this.certificates.patchValue({
      });
    }
  }
  close() {
    this.dialogRef.close()
  }
}
