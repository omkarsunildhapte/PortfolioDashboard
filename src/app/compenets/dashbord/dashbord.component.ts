import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { CurdService } from 'src/app/shared/curd/curd.service';

@Component({
  selector: 'app-dashbord',
  templateUrl: './dashbord.component.html',
  styleUrls: ['./dashbord.component.scss']
})
export class DashbordComponent {

  contacts!: any[];
  displayedColumns: string[] = ['name', 'companyName', 'email', 'phoneNumber', 'message'];
  dataSource!: MatTableDataSource<any>;

  constructor(private firebaseService: CurdService) { this.getProjects() }

  getProjects() {
    const collectionName = 'items';
    this.firebaseService.getProjects(collectionName).subscribe((Projects: any) => {
      this.contacts = Projects;
      this.dataSource = new MatTableDataSource(this.contacts);
    });
  }
}
