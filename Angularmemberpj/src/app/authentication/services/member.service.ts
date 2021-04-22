import { Injectable } from "@angular/core";
import { AccountService, IAccount, IRoleAccount } from '../../shareds/services/account.service';
import { IMemberSearch, IMember } from '../components/members/members.interface';
import { HttpService } from '../../services/http.service';
import { AuthenService } from '../../services/authen.service';
declare let $;

@Injectable()
export class MemberService {
    constructor(
        private account: AccountService,
        private http: HttpService,
        private authen: AuthenService
    ) { }

    // ดึงข้อมูลสมาชิกทังหมด
    getMembers(options?: IMemberSearch) {
        return this.http
            .requestGet(`api/member?${$.param(options)}`, this.authen.getAuthenticated())
            .toPromise() as Promise<IMember>;
    }

    // ดึงข้อมูลสมาชิกแค่คนเดียว
    getMemberById(id) {
        return this.http
            .requestGet(`api/member/${id}`, this.authen.getAuthenticated())
            .toPromise() as Promise<IAccount>;
    }

    // เพิ่มข้อมูลสมาชิก
    createMemeber(model: IAccount) {
        return this.http
            .requestPost('api/member', model, this.authen.getAuthenticated())
            .toPromise() as Promise<IAccount>;
    }

    // ลบข้อมูลสมาชิก
    deleteMember(id: any) {
        return this.http
            .requestDelete(`api/member/${id}`, this.authen.getAuthenticated())
            .toPromise() as Promise<number>;
    }

    // แก้ไขสมาชิก
    updateMember(id: any, model: IAccount) {
        return this.http
            .requestPut(`api/member/${id}`, model, this.authen.getAuthenticated())
            .toPromise() as Promise<IAccount>;
    }
}