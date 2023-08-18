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
  mySelf: any
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

    const collectionName = 'mySelf';
    this.curdService.getProjects(collectionName).subscribe((Projects: any) => {
      this.mySelf = Projects
    });
  }
  onSubmit() {
    if (!this.mySelfForm.valid || !this.selectedFile) {
      return;
    }
    const collectionName = 'mySelf';
    const filePath = `mySelf/${this.selectedFile.name}`;
    const task = this.curdService.uploadFile(collectionName, filePath, this.selectedFile);
    task.snapshotChanges().toPromise()
      .then((snapshot: any) => snapshot.ref.getDownloadURL())
      .then(downloadURL => {
        this.mySelfForm.patchValue({ imageUrl: downloadURL });
        const formValues = this.mySelfForm.value;
        const newProject: any = {
          ...formValues,
        };
        this.mySelfForm.reset();
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
    this.selectedFile = event.target.files[0];
  }

}
