import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BsDropdownModule, ModalModule, PaginationModule, BsDatepickerModule } from 'ngx-bootstrap';
import { AuthNavbarComponent } from './components/auth-navbar/auth-navbar.component';
import { AuthSidebarComponent } from './components/auth-sidebar/auth-sidebar.component';
import { AuthContentComponent } from './components/auth-content/auth-content.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AlertService } from './services/alert.service';
import { AccountService } from './services/account.service';
import { ValidatorsService } from './services/validators.service';
import { SharedsService } from './services/shareds.service';

// เพิ่มภาษาไทยให้กับ Datepicker
import { defineLocale } from 'ngx-bootstrap/chronos';
import { thLocale } from 'ngx-bootstrap/locale';
defineLocale('th', thLocale);

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        ReactiveFormsModule,
        FormsModule,
        BsDropdownModule.forRoot(),
        ModalModule.forRoot(),
        PaginationModule.forRoot(),
        BsDatepickerModule.forRoot()
    ],
    declarations: [
        AuthNavbarComponent,
        AuthSidebarComponent,
        AuthContentComponent
    ],
    exports: [
        AuthNavbarComponent,
        AuthSidebarComponent,
        AuthContentComponent,
        BsDropdownModule,
        ReactiveFormsModule,
        FormsModule,
        ModalModule,
        PaginationModule,
        BsDatepickerModule
    ],
    providers: [
        AlertService,
        SharedsService,
        // AccountService,
        ValidatorsService
    ]
})
export class SharedsModule { }
