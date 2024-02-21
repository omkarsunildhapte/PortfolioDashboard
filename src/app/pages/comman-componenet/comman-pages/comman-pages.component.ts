import { Component } from '@angular/core';
import { navItems } from '../../../interface/_nav';

@Component({
  selector: 'app-comman-pages',
  templateUrl: './comman-pages.component.html',
  styleUrl: './comman-pages.component.scss'
})
export class CommanPagesComponent {
  public navItems = navItems;

}
