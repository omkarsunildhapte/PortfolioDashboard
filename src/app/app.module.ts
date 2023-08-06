import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './compenets/header/header.component';
import { DashbordComponent } from './compenets/dashbord/dashbord.component';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ProjextsComponent } from './compenets/projexts/projexts.component';
import { DynamicFormComponent } from './compenets/dynamic-form/dynamic-form.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { MatCardModule } from '@angular/material/card';
import { ServiesComponent } from './compenets/servies/servies.component';
import { MatTableModule } from '@angular/material/table';
import { SkillsComponent } from './compenets/skills/skills.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ClientsComponent } from './compenets/clients/clients.component';
import { CertifictedComponent } from './compenets/certificted/certificted.component';
import { MyselfComponent } from './compenets/myself/myself.component';
import { MyDatePipe } from './shared/pipes/date.pipe';
import { MatExpansionModule } from '@angular/material/expansion';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DashbordComponent,
    ProjextsComponent,
    DynamicFormComponent,
    ServiesComponent,
    SkillsComponent,
    ClientsComponent,
    MyDatePipe,
    CertifictedComponent,
    MyselfComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatToolbarModule,
    MatDialogModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    AngularFireModule.initializeApp(environment.firebase),
    MatCardModule,
    MatTableModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatExpansionModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
