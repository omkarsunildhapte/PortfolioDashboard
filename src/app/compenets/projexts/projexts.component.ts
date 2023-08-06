import { Component } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { DynamicFormComponent } from '../dynamic-form/dynamic-form.component';
import { CurdService } from '../../shared/curd/curd.service';

@Component({
  selector: 'app-projexts',
  templateUrl: './projexts.component.html',
  styleUrls: ['./projexts.component.scss']
})
export class ProjextsComponent {
  constructor(public dialog: MatDialog, private firebaseService: CurdService,
  ) { }
  projects!: any[];


  ngOnInit() {
    this.getProjects();
  }

  getProjects() {
    const collectionName = 'projects';
    this.firebaseService.getProjects(collectionName).subscribe((Projects: any[]) => {
      this.projects = Projects
    });
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(DynamicFormComponent, {
      width: "800px",
      data: "Project"
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
