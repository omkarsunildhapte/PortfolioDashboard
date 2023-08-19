import { Component } from '@angular/core';
import { DynamicFormComponent } from '../dynamic-form/dynamic-form.component';
import { MatDialog } from '@angular/material/dialog';
import { CurdService } from 'src/app/shared/curd/curd.service';
import { AlertComponent } from '../alert/alert.component';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent {
  client: any;
  collectionName = 'clients';
  constructor(public dialog: MatDialog, private curdService: CurdService) { }
  ngOnInit() {
    this.getProjects();
  }
  getProjects() {
    this.curdService.getProjects(this.collectionName).subscribe((Projects: any) => {
      this.client = Projects
    });
  }
  add(): void {
    const dialogRef = this.dialog.open(DynamicFormComponent, {
      width: "800px",
      data: {
        title: 'Clients',
        data: ''
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const filePath = `${this.collectionName}/${result.file.name}`;
        const task = this.curdService.uploadFile(this.collectionName, filePath, result.file);
        task.snapshotChanges().toPromise()
          .then((snapshot: any) => snapshot.ref.getDownloadURL())
          .then(downloadURL => {
            result.client.imageUrl = downloadURL
            const formValues = result.client;
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
  edit(item: any) {
    const filename = item.imageUrl
    const dialogRef = this.dialog.open(DynamicFormComponent, {
      width: "800px",
      data: {
        title: 'Clients',
        data: item
      }
    });
    dialogRef.afterClosed().subscribe(result => {

      if (filename == result.file) {
        this.curdService.editProjectToImg(this.collectionName, result.id, result.client)
      }
      else {
        this.curdService.deleteImageByUrl(filename);
        this.curdService.editProjects(this.collectionName, result.id, result.client, result.file)
      }
    });
  }
  delete(client: any) {
    const dialogRef = this.dialog.open(AlertComponent, {
      width: "800px",
      data: {
        message: "Are you sure?",
        data: client
      }
    })
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.curdService.deleteProject(this.collectionName, result)
        this.curdService.deleteImageByUrl(client.imageUrl)
      }
    })
  }
}
