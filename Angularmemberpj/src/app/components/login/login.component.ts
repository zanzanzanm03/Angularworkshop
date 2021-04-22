import { Component, OnInit } from '@angular/core';
import { AppURL } from '../../app.url';
import { ILoginComponent } from './login.interface';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertService } from '../../shareds/services/alert.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthURL } from '../../authentication/authentication.url';
import { AccountService } from '../../shareds/services/account.service';
import { AuthenService } from '../../services/authen.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements ILoginComponent {
    constructor(
        private builder: FormBuilder,
        private alert: AlertService,
        private router: Router,
        private account: AccountService,
        private authen: AuthenService,
        private activateRoute: ActivatedRoute
    ) {
        // เก็บค่า return url เพื่อ redirect หลังจาก login
        this.activateRoute.params.forEach(params => {
            this.returnURL = params.returnURL || `/${AppURL.Authen}`;
        });
        this.initialCreateFormData();
    }

    Url = AppURL;
    returnURL: string;
    form: FormGroup;

    // เข้าสุ่ระบบ
    onSubmit(): void {
        if (this.form.invalid)
            return this.alert.someting_wrong();
        this.account
            .onLogin(this.form.value)
            .then(res => {
                // เก็บ session
                this.authen.setAuthenticated(res.accessToken);
                // alert และ redirect หน้า page
                this.alert.notify('เข้าสู่ระบบสำเร็จ', 'info');
                this.router.navigateByUrl(this.returnURL);
            })
            .catch(err => this.alert.notify(err.Message));
    }

    // สร้างฟอร์ม
    private initialCreateFormData() {
        this.form = this.builder.group({
            email: ['', Validators.required],
            password: ['', Validators.required],
            remember: [true]
        });
    }
}
