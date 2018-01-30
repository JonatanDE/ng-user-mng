import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

// store
import { StoreModule } from '@ngrx/store';
import { reducer } from './store/reducers/user.reducer';
import { EffectsModule } from '@ngrx/effects';
import { UserEffects } from './store/effects/user.effects';

// routes
import { UserRoutes } from './user.routes';

// services
import { UserCrudService } from './services/user-crud.service';

// components
import { UserComponent } from './components/user/user.component';
import { UsersListComponent } from './containers/users-list/users-list.component';
import { UserDetailComponent } from './containers/user-detail/user-detail.component';
import { UserCreateComponent } from './components/user-create/user-create.component';
import { UserViewComponent } from './components/user-view/user-view.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { UserListBlockComponent } from './components/user-list-block/user-list-block.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { UserModalComponent } from './components/user-modal/user-modal.component';

@NgModule({
  imports: [
    CommonModule,
    UserRoutes,
    ReactiveFormsModule,
    StoreModule.forFeature('user', reducer),
    EffectsModule.forFeature([UserEffects])
  ],
  declarations: [
    UserComponent,
    UsersListComponent,
    UserDetailComponent,
    UserCreateComponent,
    UserViewComponent,
    UserEditComponent,
    UserListBlockComponent,
    UserFormComponent,
    UserModalComponent
  ],
  providers: [UserCrudService]
})
export class UserModule {}
