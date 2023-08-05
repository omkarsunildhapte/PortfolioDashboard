import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DynamicFormComponent } from '../dynamic-form/dynamic-form.component';
import { CurdService, Project } from '../serives/curd.service';

@Component({
  selector: 'app-projexts',
  templateUrl: './projexts.component.html',
  styleUrls: ['./projexts.component.scss']
})
export class ProjextsComponent {
  constructor(public dialog: MatDialog, private firebaseService: CurdService) { }
  projects!: Project[];


  ngOnInit() {
    this.getProjects();
  }

  getProjects() {
    const collectionName = 'projects';
    this.firebaseService.getProjects(collectionName).subscribe((Projects: Project[]) => {
      this.projects = Projects
    });
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(DynamicFormComponent, {
      width: "800px"
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
