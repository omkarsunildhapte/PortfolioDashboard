import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AboutRoutingModule } from './about-routing.module';
import { MyselfComponent } from './myself/myself.component';
import { ButtonGroupModule, ButtonModule, CardModule, DropdownModule, FormModule, GridModule, ListGroupModule, SharedModule } from '@coreui/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FirebaseDataService } from '../../servies/firebase-data.service';
import { EducationComponent } from './education/education.component';
import { ExperienceComponent } from './experience/experience.component';
import { CousersComponent } from './cousers/cousers.component';

@NgModule({
  declarations: [MyselfComponent, EducationComponent, ExperienceComponent, CousersComponent],
  imports: [
    CommonModule,
    AboutRoutingModule,
    CardModule,
    FormModule,
    GridModule,
    ButtonModule,
    FormsModule,
    ReactiveFormsModule,
    FormModule,
    ButtonModule,
    ButtonGroupModule,
    DropdownModule,
    SharedModule,
    ListGroupModule
  ],
  providers: [FirebaseDataService]
})
export class AboutModule { }
