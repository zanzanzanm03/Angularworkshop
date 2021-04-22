import { Component, OnInit } from '@angular/core';
import { IMemberCreateComponent } from './member-create.interface';
import { IRoleAccount } from '../../../shareds/services/account.service';
import { SharedsService } from '../../../shareds/services/shareds.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertService } from '../../../shareds/services/alert.service';
import { ValidatorsService } from '../../../shareds/services/validators.service';
import { MemberService } from '../../services/member.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AppURL } from '../../../app.url';
import { AuthURL } from '../../authentication.url';

@Component({
    selector: 'app-member-create',
    templateUrl: './member-create.component.html',
    styleUrls: ['./member-create.component.css'],
    providers: [MemberService]
})
export class MemberCreateComponent implements IMemberCreateComponent {
    constructor(
        private shareds: SharedsService,
        private builder: FormBuilder,
        private alert: AlertService,
        private validators: ValidatorsService,
        private member: MemberService,
        private router: Router,
        private activatedRouter: ActivatedRoute
    ) {
        this.activatedRouter.params.forEach(params => {
            this.memId = params.id;
        });
        this.initialCreateFormData();
        this.initialUpdateFormData();
        // เพิ่ม position
        this.positionItems = this.shareds.positionItems;
    }

    form: FormGroup;
    memId: any;
    positionItems: string[];
    roleItems: IRoleAccount[] = [
        IRoleAccount.Member,
        IRoleAccount.Employee,
        IRoleAccount.Admin
    ];

    // บันทึกหรือแก้ไขข้อมูล
    onSubmit(): void {
        if (this.form.invalid)
            return this.alert.someting_wrong();
        // หากเป็นการเพิ่มสมาชิกใหม่
        if (!this.memId) {
            this.member
                .createMemeber(this.form.value)
                .then(res => {
                    this.alert.notify('บันทึกข้อมูลสำเร็จ', 'info');
                    this.router.navigate(['/', AppURL.Authen, AuthURL.Member]);
                })
                .catch(err => this.alert.notify(err.Message));
        }
        // หากเป็นการแก้ไขสมาชิก
        else {
            this.member
                .updateMember(this.memId, this.form.value)
                .then(res => {
                    this.alert.notify('แก้ไขข้อมูลสำเร็จ', 'info');
                    this.router.navigate(['/', AppURL.Authen, AuthURL.Member]);
                })
                .catch((err) => this.alert.notify(err.Message));
        }
    }

    // แสดงข้อมูลสิทธิ์ผู้ใช้เป็น ชื่อตัวหนังสือ
    getRoleName(role: IRoleAccount): string {
        return IRoleAccount[role];
    }

    // แสดงตัวอย่างภาพอัพโหลด
    onConvertImage(input: HTMLInputElement) {
        const imageControl = this.form.controls['image'];
        this.shareds
            .onConvertImage(input)
            .then(base64 => imageControl.setValue(base64))
            .catch(err => {
                input.value = null;
                imageControl.setValue(null);
                this.alert.notify(err.Message);
            });
    }

    // สร้างฟอร์ม
    private initialCreateFormData() {
        this.form = this.builder.group({
            image: [],
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, this.validators.isPassword]],
            firstname: ['', [Validators.required]],
            lastname: ['', [Validators.required]],
            position: ['', [Validators.required]],
            role: ['', [Validators.required]]
        });
    }

    // แก้ไขฟอร์ม
    private initialUpdateFormData() {
        if (!this.memId) return;
        this.member
            .getMemberById(this.memId)
            .then(member => {
                // นำข้อมูลมาใส่ ฟอร์ม
                const form = this.form;
                form.controls['image'].setValue(member.image);
                form.controls['email'].setValue(member.email);
                form.controls['firstname'].setValue(member.firstname);
                form.controls['lastname'].setValue(member.lastname);
                form.controls['position'].setValue(member.position);
                form.controls['role'].setValue(member.role);
                form.controls['password'].setValidators(this.validators.isPassword);
                form.controls['password'].updateValueAndValidity();
            })
            .catch(err => {
                this.alert.notify(err.Message);
                this.router.navigate(['/', AppURL.Authen, AuthURL.Member]);
            });
    }
}
