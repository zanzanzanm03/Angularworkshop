import { Injectable } from '@angular/core';
import { IRegister } from '../../components/register/register.interface';
import { ILogin } from '../../components/login/login.interface';
import { IProfile } from '../../authentication/components/profile/profile.interface';
import { IChangePassword } from '../../authentication/components/profile/change-password/change-password.interface';
import { HttpService } from '../../services/http.service';
@Injectable({
    providedIn: 'root'
})
export class AccountService { // Service นี้คือ Global service
    constructor(
        private http: HttpService
    ) { }

    // store user login ไว้
    public UserLogin: IAccount = {} as any;
    public setUserLogin(userLogin: IAccount) {
        this.UserLogin.id = userLogin.id;
        this.UserLogin.firstname = userLogin.firstname;
        this.UserLogin.lastname = userLogin.lastname;
        this.UserLogin.email = userLogin.email;
        this.UserLogin.password = userLogin.password;
        this.UserLogin.image = userLogin.image;
        this.UserLogin.position = userLogin.position;
        this.UserLogin.role = userLogin.role;
        this.UserLogin.created = userLogin.created;
        this.UserLogin.updated = userLogin.updated;
        return this.UserLogin;
    }

    //  เปลี่ยนรหัสผ่านใหม่
    onChangePassword(accessToken: string, model: IChangePassword) {
        return this.http
            .requestPost('api/member/change-password', model, accessToken)
            .toPromise() as Promise<IAccount>;
    }

    // แก้ไขข้อมูลส่วนตัว Update profile
    onUpdateProfile(accessToken: string, model: IProfile) {
        return (this.http
            .requestPost('api/member/profile', model, accessToken)
            .toPromise() as Promise<IAccount>)
            .then(user => this.setUserLogin(user));
    }

    // ดึงข้อมูลผู้ที่เข้าสู่ระบบจาก Token
    getUserLogin(accessToken: string) {
        return (this.http
            .requestGet('api/member/data', accessToken)
            .toPromise() as Promise<IAccount>)
            .then(userLogin => this.setUserLogin(userLogin));
    }

    // เข้าสู่ระบบ
    onLogin(model: ILogin) {
        return this.http
            .requestPost('api/account/login', model)
            .toPromise() as Promise<{ accessToken: string }>;
    }

    // ลงทะเบียน
    onRegister(model: IRegister) {
        return this.http
            .requestPost('api/account/register', model)
            .toPromise() as Promise<IAccount>;
    }

}

export interface IAccount {
    firstname: string;
    lastname: string;
    email: string;
    password: string;

    id?: any;
    position?: string;
    image?: string;
    role?: IRoleAccount;
    created?: Date;
    updated?: Date;
}

export enum IRoleAccount {
    Member = 1,
    Employee,
    Admin
}