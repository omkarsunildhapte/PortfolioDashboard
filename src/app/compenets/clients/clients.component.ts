import { Component } from '@angular/core';
import { DynamicFormComponent } from '../dynamic-form/dynamic-form.component';
import { MatDialog } from '@angular/material/dialog';
import { CurdService } from 'src/app/shared/curd/curd.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent {
  client: any;
  constructor(public dialog: MatDialog, private curdService: CurdService) { }
  ngOnInit() {
    this.getProjects();
  }

  getProjects() {

    const collectionName = 'clients';
    this.curdService.getProjects(collectionName).subscribe((Projects: any) => {
      this.client = Projects
    });
  }
  add(): void {
    const dialogRef = this.dialog.open(DynamicFormComponent, {
      width: "800px",
      data: {
        title: 'Clients'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      const collectionName = 'clients';
      const filePath = `clients/${result.file.name}`;
      const task = this.curdService.uploadFile(collectionName, filePath, result.file);
      task.snapshotChanges().toPromise()
        .then((snapshot: any) => snapshot.ref.getDownloadURL())
        .then(downloadURL => {
          result.client.imageUrl = downloadURL
          const formValues = result.client;
          return this.curdService.addProject(collectionName, formValues);
        })
        .then(() => {
          console.log('Project added successfully with image URL');
        })
        .catch(error => {
          console.error('Error uploading and adding project:', error);
        });
    });
  }
  edit(item: any) {

    const dialogRef = this.dialog.open(DynamicFormComponent, {
      width: "800px",
      data: {
        title: 'Clients',
        editValue: item
      }
    });

    dialogRef.afterClosed().subscribe(result => {

    });
  }

}
