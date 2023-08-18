import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CurdService } from 'src/app/shared/curd/curd.service';
import { DynamicFormComponent } from '../dynamic-form/dynamic-form.component';

@Component({
  selector: 'app-certificted',
  templateUrl: './certificted.component.html',
  styleUrls: ['./certificted.component.scss']
})
export class CertifictedComponent {
  projects!: any[];
  collectionName = 'Certificted';
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
  openDialog(): void {
    const dialogRef = this.dialog.open(DynamicFormComponent, {
      width: "800px",
      data: {
        title: "Certificte"
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      const filePath = `Certificte/${result.file.name}`;
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
    });
  }
}
