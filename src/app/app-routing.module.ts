import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashbordComponent } from './compenets/dashbord/dashbord.component';
import { ProjextsComponent } from './compenets/projexts/projexts.component';
import { ServiesComponent } from './compenets/servies/servies.component';
import { SkillsComponent } from './compenets/skills/skills.component';
import { CertifictedComponent } from './compenets/certificted/certificted.component';
import { ClientsComponent } from './compenets/clients/clients.component';
import { MyselfComponent } from './compenets/myself/myself.component';

const routes: Routes = [
  { path: "", component: DashbordComponent },
  { path: 'project', component: ProjextsComponent },
  { path: "servies", component: ServiesComponent },
  { path: "skills", component: SkillsComponent },
  { path: "certificates", component: CertifictedComponent },
  { path: "clients", component: ClientsComponent },
  { path: "myself", component: MyselfComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
