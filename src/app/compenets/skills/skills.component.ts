import { Component } from '@angular/core';
import { CurdService } from 'src/app/shared/curd/curd.service';
import { DynamicFormComponent } from '../dynamic-form/dynamic-form.component';
import { MatDialog } from '@angular/material/dialog';
import { AlertComponent } from '../alert/alert.component';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss']
})
export class SkillsComponent {
  skills!: any;
  collectionName = 'skills';
  constructor(public dialog: MatDialog, private curdService: CurdService) {
    this.getProjects()
  }
  getProjects() {
    this.curdService.getProjects(this.collectionName).subscribe((Projects: any) => {
      this.skills = Projects;
    });
  }
  ngDoCheck() {
    if (this.skills && Array.isArray(this.skills)) {
      for (let i = 0; i < this.skills.length; i++) {
        if (this.skills[i] && this.skills[i].expirationDate) {
          this.skills[i].someDate = new Date();
        }
        this.skills?.forEach(skill => {
          if (skill.expirationDate && typeof skill.expirationDate.toDate === 'function') {
            skill.expirationDate = skill.expirationDate.toDate();
          }
        });
      }
    }
  }

  add(): void {
    const dialogRef = this.dialog.open(DynamicFormComponent, {
      width: "800px",
      data: {
        title: 'Skills',
        data: ''
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const filePath = `skills/${result.file.name}`;
        const task = this.curdService.uploadFile(this.collectionName, filePath, result.file);
        task.snapshotChanges().toPromise()
          .then((snapshot: any) => snapshot.ref.getDownloadURL())
          .then(downloadURL => {
            result.skill.imageUrl = downloadURL
            return this.curdService.addProject(this.collectionName, result.skill);
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
  edit(data: any) {
    const file = data.imageUrl;
    const dialogRef = this.dialog.open(DynamicFormComponent, {
      width: "800px",
      data: {
        title: 'Skills',
        data: data
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (file == result.file) {
          result.skill.imageUrl = result.file
          this.curdService.editProjectToImg(this.collectionName, result.id, result.skill)
        }
        else {
          this.curdService.deleteImageByUrl(file);
          this.curdService.editProjects(this.collectionName, result.id, result.skill, result.file)
        }
      }
    })
  }
  delete(data: any) {
    const file = data.imageUrl
    const dialogRef = this.dialog.open(AlertComponent, {
      width: "800px",
      data: {
        message: 'Are you sure ?',
        data: data
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.curdService.deleteImageByUrl(file)
        this.curdService.deleteProject(this.collectionName, result);
      }
    })
  }
}
