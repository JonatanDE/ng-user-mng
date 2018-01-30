import { RouterModule } from '@angular/router';

import { UserComponent } from './components/user/user.component';
import { UsersListComponent } from './containers/users-list/users-list.component';
import { UserDetailComponent } from './containers/user-detail/user-detail.component';

const Routes = [
  {
    path: 'users',
    component: UserComponent,
    children: [
      {
        path: '',
        component: UsersListComponent
      },
      {
        path: 'detail/:id',
        component: UserDetailComponent
      }
    ]
  }
];

export const UserRoutes = RouterModule.forChild(Routes);
