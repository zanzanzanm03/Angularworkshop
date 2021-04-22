import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MemberService } from '../../services/member.service';
import { IMembersComponent, IMemberSearchKey, IMemberSearch, IMember } from './members.interface';
import { IAccount, IRoleAccount, AccountService } from '../../../shareds/services/account.service';
import { AlertService } from '../../../shareds/services/alert.service';
import { PageChangedEvent, BsLocaleService } from 'ngx-bootstrap';
import { Router } from '@angular/router';
import { AppURL } from '../../../app.url';
import { AuthURL } from '../../authentication.url';
import { AuthenService } from '../../../services/authen.service';

@Component({
    selector: 'app-members',
    templateUrl: './members.component.html',
    styleUrls: ['./members.component.css'],
    providers: [MemberService]
})
export class MembersComponent implements IMembersComponent {
    constructor(
        private member: MemberService,
        private alert: AlertService,
        private detect: ChangeDetectorRef,
        private router: Router,
        private localeService: BsLocaleService,
        private authen: AuthenService,
        private account: AccountService
    ) {
        // เปลี่ยน Datepicker เป็นภาษาไทย
        this.localeService.use('th');
        // โหลดข้อมูลสมาชิก
        this.initialLoadMembers({
            startPage: this.startPage,
            limitPage: this.limitPage
        });
        // กำหนดค่าเริ่มให้กับ searchType
        this.serachType = this.searchTypeItems[0];
        // โหลด user login
        this.initialLoadUserLogin();
    }

    items: IMember;

    // ตัวแปรสำหรับค้นหา
    searchText: string = '';
    serachType: IMemberSearchKey;
    searchTypeItems: IMemberSearchKey[] = [
        { key: 'email', value: 'ค้นหาจากอีเมล์' },
        { key: 'firstname', value: 'ค้นหาจากชื่อ' },
        { key: 'lastname', value: 'ค้นหาจากนามสกุล' },
        { key: 'position', value: 'ค้นหาจากตำแหน่ง' },
        { key: 'role', value: 'ค้นหาจากสิทธิ์ผู้ใช้' },
        { key: 'updated', value: 'ค้นหาจากวันที่' }
    ];

    // ตัวแปร pagination 
    startPage: number = 1;
    limitPage: number = 5;

    // ตรวจสอบสิทธ์ผู้ใช้งาน
    UserLogin: IAccount;
    Role = IRoleAccount

    // เปลี่ยนหน้า pagination
    onPageChanged(page: PageChangedEvent) {
        this.initialLoadMembers({
            searchText: this.getSearchText,
            searchType: this.serachType.key,
            startPage: page.page,
            limitPage: page.itemsPerPage
        });
    }

    // ค้นหาข้อมูล
    onSearchItem() {
        this.startPage = 1;
        this.initialLoadMembers({
            searchText: this.getSearchText,
            searchType: this.serachType.key,
            startPage: this.startPage,
            limitPage: this.limitPage
        });
        // กระตุ้น Event
        this.detect.detectChanges();
    }

    // แสดงชื่อสิทธิ์ผู้ใช้งาน
    getRoleName(role: IRoleAccount) {
        return IRoleAccount[role];
    }

    // ลบข้อมูลสมาชิก
    onDeleteMember(item: IAccount) {
        this.alert.confirm().then(status => {
            if (!status) return;
            this.member
                .deleteMember(item.id)
                .then(() => {
                    // โหลดข้อมูล Member ใหม่
                    this.initialLoadMembers({
                        searchText: this.getSearchText,
                        searchType: this.serachType.key,
                        startPage: this.startPage,
                        limitPage: this.limitPage
                    });
                    this.alert.notify('ลบข้อมูลสำเร็จ', 'info');
                })
                .catch(err => this.alert.notify(err.Message));
        });
    }

    // แก้ไขข้อมูลสมาชิกโดยส่ง id ไปยัง url
    onUpdateMember(item: IAccount) {
        this.router.navigate(['',
            AppURL.Authen,
            AuthURL.MemberCreate,
            item.id
        ]);
    }

    // ตรวจสอบและ return ค่า searchText
    private get getSearchText() {
        let responseSearchText = null;
        switch (this.serachType.key) {
            case 'role':
                responseSearchText = IRoleAccount[this.searchText] || '';
                break;
            case 'updated':
                const searchDate: { from: Date, to: Date } = { from: this.searchText[0], to: this.searchText[1] } as any;
                searchDate.from.setHours(0);
                searchDate.from.setMinutes(0);
                searchDate.from.setSeconds(0);
                searchDate.to.setHours(23);
                searchDate.to.setMinutes(59);
                searchDate.to.setSeconds(59);
                responseSearchText = searchDate;
                break;
            default:
                responseSearchText = this.searchText;
                break;
        }
        return responseSearchText;
    }

    // โหลดข้อมูลสมาชิก
    private initialLoadMembers(options?: IMemberSearch) {
        this.member
            .getMembers(options)
            .then(items => this.items = items)
            .catch(err => this.alert.notify(err.Message));
    }

    // โหลดข้อมูลผู้ใช้ที่ยัง Login
    private initialLoadUserLogin() {
        this.UserLogin = this.account.UserLogin;
        this.account
            .getUserLogin(this.authen.getAuthenticated())
            .then(userLogin => this.UserLogin = userLogin)
            .catch(err => this.alert.notify(err.Message));
    }
}
