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
  client: any
  constructor(public dialog: MatDialog, private curdService: CurdService) { }
  ngOnInit() {
    this.getProjects();
  }

  getProjects() {
    debugger
    const collectionName = 'clients';
    this.curdService.getProjects(collectionName).subscribe((Projects: any) => {
      this.client = Projects
    });
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(DynamicFormComponent, {
      width: "800px",
      data: 'Clients'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
