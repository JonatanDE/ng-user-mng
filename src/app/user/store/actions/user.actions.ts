import { Action } from '@ngrx/store';
import { User } from '../../models/user.model';

export enum UserActionTypes {
  LoadUsers = '[User] Loading Users',
  LoadUsersSuccess = '[User] Load Users Success',
  SelectUser = '[User] Selected user',
  AddUser = '[User] Add User',
  AddUserSuccess = '[User] User added',
  UpdateUser = '[User] Update User',
  UpdateUserSuccess = '[User] User updated',
  DeleteUser = '[User] Delete User',
  DeleteUserSuccess = '[User] User deleted',
  ClearUsers = '[User] Clear Users',
  Fail = '[User] Failed'
}

export class LoadUsers implements Action {
  readonly type = UserActionTypes.LoadUsers;
}

export class LoadUsersSuccess implements Action {
  readonly type = UserActionTypes.LoadUsersSuccess;

  constructor(public payload: { users: User[] }) {}
}

export class SelectUser implements Action {
  readonly type = UserActionTypes.SelectUser;

  constructor(public payload: number) {}
}

export class AddUser implements Action {
  readonly type = UserActionTypes.AddUser;

  constructor(public payload: { user: User }) {}
}

export class AddUserSuccess implements Action {
  readonly type = UserActionTypes.AddUserSuccess;

  constructor(public payload: { user: User }) {}
}

export class UpdateUser implements Action {
  readonly type = UserActionTypes.UpdateUser;

  constructor(public payload: { user: { id: number; changes: User } }) {}
}

export class UpdateUserSuccess implements Action {
  readonly type = UserActionTypes.UpdateUserSuccess;

  constructor(public payload: { user: { id: number; changes: User } }) {}
}

export class DeleteUser implements Action {
  readonly type = UserActionTypes.DeleteUser;

  constructor(public payload: { id: number }) {}
}

export class DeleteUserSuccess implements Action {
  readonly type = UserActionTypes.DeleteUserSuccess;

  constructor(public payload: { id: number }) {}
}

export class Fail implements Action {
  readonly type = UserActionTypes.Fail;
  constructor(public payload: any) {}
}

export class ClearUsers implements Action {
  readonly type = UserActionTypes.ClearUsers;
}

export type UserActions =
  | LoadUsers
  | LoadUsersSuccess
  | SelectUser
  | AddUser
  | AddUserSuccess
  | UpdateUser
  | UpdateUserSuccess
  | DeleteUser
  | DeleteUserSuccess
  | ClearUsers
  | Fail;
