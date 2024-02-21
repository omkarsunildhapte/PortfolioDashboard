import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ButtonModule, CardModule, FormModule, GridModule } from '@coreui/angular';
import { IconModule } from '@coreui/icons-angular';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CardModule, ButtonModule, GridModule, IconModule, FormModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

}
