import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DynamicFormComponent } from '../dynamic-form/dynamic-form.component';
import { CurdService } from '../../shared/curd/curd.service';
import { AlertComponent } from './../alert/alert.component';

@Component({
  selector: 'app-projexts',
  templateUrl: './projexts.component.html',
  styleUrls: ['./projexts.component.scss']
})
export class ProjextsComponent {
  projects: any;
  collectionName = 'projects';
  constructor(public dialog: MatDialog, private curdService: CurdService,
  ) { }

  ngOnInit() {
    this.getProjects();
  }

  getProjects() {
    this.curdService.getProjects(this.collectionName).subscribe((Projects: any[]) => {
      this.projects = Projects
    });
  }
  delete(data: any): void {
    const dialogRef = this.dialog.open(AlertComponent, {
      width: "500px",
      data: {
        message: "Are you Sure Delete",
        data: {
          id: data.id,
          name: data.projectName
        }
      }
    });
    dialogRef.afterClosed().subscribe(result => {

      this.curdService.deleteProject(this.collectionName, result)
    })
  }
  edit(data: any): void {
    const file = data.imageUrl
    const dialogRef = this.dialog.open(DynamicFormComponent, {
      width: "800px",
      data: {
        title: "Project",
        data: data
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (file == result.file) {
          result.project.imageUrl = file
          this.curdService.editProjectToImg(this.collectionName, result.id, result.project)
        }
        else {
          this.curdService.deleteImageByUrl(file)
          this.curdService.editProjects(this.collectionName, result.id, result.project, result.file)
        }
      }
    })
  }
  add(): void {
    const dialogRef = this.dialog.open(DynamicFormComponent, {
      width: "800px",
      data: {
        title: "Project"
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const filePath = `${this.collectionName}/${result.file.name}`;
        const task = this.curdService.uploadFile(this.collectionName, filePath, result.file);
        task.snapshotChanges().toPromise()
          .then((snapshot: any) => snapshot.ref.getDownloadURL())
          .then(downloadURL => {
            result.project.imageUrl = downloadURL
            const formValues = result.project;
            return this.curdService.addProject(this.collectionName, formValues);
          })
          .then(() => {
            console.log('Project added successfully with image URL');
          })
          .catch(error => {
            console.error('Error uploading and adding project:', error);
          });
      }
    });
  }
}
