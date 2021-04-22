import { Routes, RouterModule } from '@angular/router';
import { AuthURL } from './authentication.url';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SettingComponent } from './components/setting/setting.component';
import { ProfileComponent } from './components/profile/profile.component';
import { BootstrapElementsComponent } from './components/bootstrap-elements/bootstrap-elements.component';
import { CardsComponent } from './components/cards/cards.component';
import { WidgetsComponent } from './components/widgets/widgets.component';
import { MembersComponent } from './components/members/members.component';
import { MemberCreateComponent } from './components/member-create/member-create.component';
import { UserRoleGuard } from '../guards/user-role.guard';
import { IRoleAccount } from '../shareds/services/account.service';

const RouteLists: Routes = [
    { path: '', redirectTo: AuthURL.Profile, pathMatch: 'full' },
    {
        path: AuthURL.Dashboard, component: DashboardComponent,
        canActivate: [UserRoleGuard],
        data: { roles: [IRoleAccount.Admin, IRoleAccount.Employee] }
    },
    { path: AuthURL.Setting, component: SettingComponent },
    { path: AuthURL.Profile, component: ProfileComponent },
    { path: AuthURL.Element, component: BootstrapElementsComponent },
    { path: AuthURL.Card, component: CardsComponent },
    { path: AuthURL.Widget, component: WidgetsComponent },
    {
        path: AuthURL.Member, component: MembersComponent,
        canActivate: [UserRoleGuard],
        data: { roles: [IRoleAccount.Admin, IRoleAccount.Employee] }
    },
    {
        path: AuthURL.MemberCreate,
        canActivate: [UserRoleGuard],
        data: { roles: [IRoleAccount.Admin] },
        children: [
            { path: '', component: MemberCreateComponent },
            { path: ':id', component: MemberCreateComponent },
        ]
    }
];

export const AuthenticationRouting = RouterModule.forChild(RouteLists);