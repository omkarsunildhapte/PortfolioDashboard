import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyselfComponent } from './myself/myself.component';
import { EducationComponent } from './education/education.component';
import { ExperienceComponent } from './experience/experience.component';
import { CousersComponent } from './cousers/cousers.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'myself',
    pathMatch: 'full'
  }, {
    path: 'myself',
    component: MyselfComponent,
    data: {
      title: `MySelf`
    }
  }, {
    path: 'education',
    component: EducationComponent,
    data: {
      title: `Education`
    }
  }, {
    path: 'experience',
    component: ExperienceComponent,
    data: {
      title: `Experience`
    }
  }, {
    path: 'course',
    component: CousersComponent,
    data: {
      title: `Course`
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AboutRoutingModule { }
