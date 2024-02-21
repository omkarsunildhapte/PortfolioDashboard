import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-comman-pages-header',
  templateUrl: './comman-pages-header.component.html',
  styleUrl: './comman-pages-header.component.scss'
})
export class CommanPagesHeaderComponent {

  @Input() sidebarId: string = "sidebar";

  public newMessages = new Array(4)
  public newTasks = new Array(5)
  public newNotifications = new Array(5)

  // constructor(private classToggler: ClassToggleService) {
  //   super();
  // }
}
