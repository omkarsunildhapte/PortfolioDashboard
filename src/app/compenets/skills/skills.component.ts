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
  collectionName = 'skills';
  constructor(public dialog: MatDialog, private curdService: CurdService) { this.getProjects() }
  getProjects() {
    this.curdService.getProjects(this.collectionName).subscribe((Projects: any) => {
      this.skills = Projects;
    });
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(DynamicFormComponent, {
      width: "800px",
      data: {
        title: 'Skills'
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      const filePath = `skills/${result.file.name}`;
      const task = this.curdService.uploadFile(this.collectionName, filePath, result.file);
      task.snapshotChanges().toPromise()
        .then((snapshot: any) => snapshot.ref.getDownloadURL())
        .then(downloadURL => {
          result.skill.imageUrl = downloadURL
          const formValues = result.skill;
          return this.curdService.addProject(this.collectionName, formValues);
        })
        .then(() => {
          console.log('Project added successfully with image URL');
        })
        .catch(error => {
          console.error('Error uploading and adding project:', error);
        });
      console.log('The dialog was closed');
    });
  }
}
