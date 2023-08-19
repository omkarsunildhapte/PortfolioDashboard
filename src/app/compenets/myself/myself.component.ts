import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CurdService } from 'src/app/shared/curd/curd.service';

@Component({
  selector: 'app-myself',
  templateUrl: './myself.component.html',
  styleUrls: ['./myself.component.scss']
})
export class MyselfComponent {
  mySelfForm: FormGroup;
  selectedFile: File | null = null;
  collectionName = 'mySelf';
  mySelf: any
  id: any;
  constructor(private fb: FormBuilder,
    private curdService: CurdService,
  ) {
    this.mySelfForm = this.fb.group({
      name: [''],
      imageUrl: [''],
      quests: [''],
      description: [''],
      jobTitle: [''],
    });
  }
  ngOnInit() {
    this.getProjects();
  }
  getProjects() {
    this.curdService.getProjects(this.collectionName).subscribe((Projects: any) => {
      this.mySelf = Projects
    });
  }
  onSubmit() {
    if (!this.mySelfForm.valid || !this.selectedFile) {
      return;
    }
    const filePath = `${this.collectionName}/${this.selectedFile.name}`;
    const task = this.curdService.uploadFile(this.collectionName, filePath, this.selectedFile);
    task.snapshotChanges().toPromise()
      .then((snapshot: any) => snapshot.ref.getDownloadURL())
      .then(downloadURL => {
        this.mySelfForm.patchValue({ imageUrl: downloadURL });
        const formValues = this.mySelfForm.value;
        const newProject: any = {
          ...formValues,
        };
        this.mySelfForm.reset();
        return this.curdService.addProject(this.collectionName, newProject);
      })
      .then(() => {
        console.log('Project added successfully with image URL');
      })
      .catch(error => {
        console.error('Error uploading and adding project:', error);
      });
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }
  edit() {
    this.mySelfForm.patchValue({
      name: this.mySelf[0].name,
      quests: this.mySelf[0].quests,
      description: this.mySelf[0].description,
      jobTitle: this.mySelf[0].jobTitle,
    });
    this.id = this.mySelf[0].id;
    this.selectedFile = this.mySelf[0].imageUrl
  }
  editform() {

    if (this.mySelfForm.valid && this.selectedFile) {
      if (this.selectedFile == this.mySelf[0].imageUrl) {
        this.mySelfForm.patchValue({ imageUrl: this.selectedFile });
        this.curdService.editProjectToImg(this.collectionName, this.id, this.mySelfForm.value);
      }
      else {
        this.curdService.deleteImageByUrl(this.mySelf[0].imageUrl);
        this.curdService.editProjects(this.collectionName, this.id, this.mySelfForm.value, this.selectedFile);
      }
      this.mySelfForm.reset();
    } else {
      console.log("something went wrong");

    }
  }
}
