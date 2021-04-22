import { IAccount, IRoleAccount } from '../../services/account.service';

export interface IAuthSidebarComponent {
    AppURL: any;
    AuthURL: any;
    UserLogin: IAccount;
    Role: typeof IRoleAccount;
}