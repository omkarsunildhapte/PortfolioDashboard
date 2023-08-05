import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashbordComponent } from './dashbord/dashbord.component';
import { ProjextsComponent } from './projexts/projexts.component';

const routes: Routes = [
  { path: "", component: DashbordComponent },
  { path: 'project', component: ProjextsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
