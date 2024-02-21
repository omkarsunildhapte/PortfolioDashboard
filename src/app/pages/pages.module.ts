import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AvatarModule, BadgeModule, BreadcrumbModule, ButtonGroupModule, ButtonModule, CardModule, DropdownModule, FooterModule, FormModule, GridModule, HeaderModule, ListGroupModule, NavModule, ProgressModule, SharedModule, SidebarModule, TabsModule, UtilitiesModule } from '@coreui/angular';
import { IconModule } from '@coreui/icons-angular';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { CommanPagesComponent } from './comman-componenet/comman-pages/comman-pages.component';
import { PagesRoutingModule } from './pages-routing.module';
import { CommanPagesHeaderComponent } from './comman-componenet/comman-pages-header/comman-pages-header.component';
import { CommanPagesFooterComponent } from './comman-componenet/comman-pages-footer/comman-pages-footer.component';


@NgModule({
  declarations: [CommanPagesComponent, CommanPagesHeaderComponent, CommanPagesFooterComponent],
  imports: [
    CommonModule,
    PagesRoutingModule,
    AvatarModule,
    BreadcrumbModule,
    FooterModule,
    DropdownModule,
    GridModule,
    HeaderModule,
    SidebarModule,
    IconModule,
    NavModule,
    ButtonModule,
    FormModule,
    UtilitiesModule,
    ButtonGroupModule,
    ReactiveFormsModule,
    SidebarModule,
    SharedModule,
    TabsModule,
    ListGroupModule,
    ProgressModule,
    BadgeModule,
    ListGroupModule,
    CardModule,
    NgScrollbarModule
  ]
})
export class PagesModule { }
