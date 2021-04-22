import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';
@Injectable()
export class ValidatorsService {

    // สร้าง validate เอง โดยเช็ค รหัสผ่านและยืนยันรหัสผ่านให้เหมือนกัน
    comparePassword(passwordField: string) {
        return function (confirm_password: AbstractControl) {
            if (!confirm_password.parent) return;
            const password = confirm_password.parent.get(passwordField);
            const passwordSubscripe = password.valueChanges.subscribe(() => {
                confirm_password.updateValueAndValidity();
                passwordSubscripe.unsubscribe();
            });
            if (confirm_password.value === password.value)
                return;
            return { compare: true };
        }
    }

    // ตรวจสอบ password pattern เป็น A-z 0-9, 6-15 ตัว
    isPassword(password: AbstractControl) {
        if (password.value == '') return;
        if (/^[A-z0-9]{6,15}$/.test(password.value)) return;
        return { password: true };
    }

}