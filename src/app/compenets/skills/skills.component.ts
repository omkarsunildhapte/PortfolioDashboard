import { Component } from '@angular/core';
import { CurdService } from 'src/app/shared/curd/curd.service';
import { DynamicFormComponent } from '../dynamic-form/dynamic-form.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss']
})
export class SkillsComponent {
  skills!: any;
  constructor(public dialog: MatDialog, private firebaseService: CurdService) { this.getProjects() }
  getProjects() {
    const collectionName = 'skills';
    this.firebaseService.getProjects(collectionName).subscribe((Projects: any) => {
      this.skills = Projects;
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DynamicFormComponent, {
      width: "800px",
      data: 'Skills'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
