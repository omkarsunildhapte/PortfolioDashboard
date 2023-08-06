import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CurdService } from 'src/app/shared/curd/curd.service';
import { DynamicFormComponent } from '../dynamic-form/dynamic-form.component';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-servies',
  templateUrl: './servies.component.html',
  styleUrls: ['./servies.component.scss']
})
export class ServiesComponent {

  servies!: any[];
  displayedColumns: string[] = ['iconName', 'serviceName', 'serviceDescription'];
  dataSource!: MatTableDataSource<any>;
  constructor(public dialog: MatDialog, private firebaseService: CurdService) { this.getProjects() }
  getProjects() {
    const collectionName = 'serives';
    this.firebaseService.getProjects(collectionName).subscribe((Projects: any) => {
      this.servies = Projects;
      this.dataSource = new MatTableDataSource(this.servies);
    });
  }


  openDialog(): void {
    const dialogRef = this.dialog.open(DynamicFormComponent, {
      width: "800px",
      data: 'Servies'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
