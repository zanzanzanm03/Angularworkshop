import { Component, OnInit } from '@angular/core';
import { AppURL } from '../../app.url';
import { IRegisterComponent } from './register.interface';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { AlertService } from '../../shareds/services/alert.service';
import { AccountService } from '../../shareds/services/account.service';
import { Router } from '@angular/router';
import { ValidatorsService } from '../../shareds/services/validators.service';
declare let $;
@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements IRegisterComponent {
    constructor(
        private builder: FormBuilder,
        private alert: AlertService,
        private account: AccountService,
        private router: Router,
        private validators: ValidatorsService
    ) {
        this.initialCreateFormData();
    }

    Url = AppURL;
    form: FormGroup;

    // ลงทะเบียน
    onSubmit() {
        if (this.form.invalid)
            return this.alert.someting_wrong();
        // ส่งข้อมูลหา Server
        this.account
            .onRegister(this.form.value)
            .then(res => {
                this.alert.notify('ลงทะเบียนสำเร็จ', 'info');
                this.router.navigate(['/', AppURL.Login]);
            })
            .catch(err => this.alert.notify(err.Message));
    }

    // สร้างฟอร์ม
    private initialCreateFormData() {
        this.form = this.builder.group({
            firstname: ['', [Validators.required]],
            lastname: ['', [Validators.required]],
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, this.validators.isPassword]],
            cpassword: ['', [Validators.required, this.validators.comparePassword('password')]]
        });
    }
}
