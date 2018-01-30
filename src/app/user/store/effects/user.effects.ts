import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, Effect, toPayload } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, mergeMap, switchMap, tap } from 'rxjs/operators';

import * as UserActions from '../actions/user.actions';
import { User } from '../../models/user.model';

import { UserCrudService } from '../../services/user-crud.service';
import { AddUser, DeleteUser, UpdateUser } from '../actions/user.actions';

@Injectable()
export class UserEffects {
  constructor(private actions$: Actions, private service: UserCrudService) {}

  @Effect()
  getAllUsers$: Observable<Action> = this.actions$
    .ofType(UserActions.UserActionTypes.LoadUsers)
    .pipe(
      mergeMap(action =>
        this.service.getUsers().pipe(
          map(users => ({
            type: UserActions.UserActionTypes.LoadUsersSuccess,
            payload: { users }
          })),
          catchError(error =>
            of({ type: UserActions.UserActionTypes.Fail, payload: error })
          )
        )
      )
    );

  @Effect()
  addUser$: Observable<Action> = this.actions$
    .ofType(UserActions.UserActionTypes.AddUser)
    .pipe(
      mergeMap((action: AddUser) =>
        this.service.createUser(action.payload.user).pipe(
          map(user => ({
            type: UserActions.UserActionTypes.AddUserSuccess,
            payload: { user }
          })),
          catchError(error =>
            of({ type: UserActions.UserActionTypes.Fail, payload: error })
          )
        )
      )
    );

  @Effect()
  updateUser$: Observable<Action> = this.actions$
    .ofType(UserActions.UserActionTypes.UpdateUser)
    .pipe(
      mergeMap((action: UpdateUser) =>
        this.service
          .updateUser(action.payload.user.id, action.payload.user.changes)
          .pipe(
            map(user => ({
              type: UserActions.UserActionTypes.UpdateUserSuccess,
              payload: {
                user: {
                  id: action.payload.user.id,
                  changes: action.payload.user.changes
                }
              }
            })),
            catchError(error =>
              of({ type: UserActions.UserActionTypes.Fail, payload: error })
            )
          )
      )
    );

  @Effect()
  deleteUser$: Observable<Action> = this.actions$
    .ofType(UserActions.UserActionTypes.DeleteUser)
    .pipe(
      mergeMap((action: DeleteUser) =>
        this.service.deleteUser(action.payload.id).pipe(
          map(user => ({
            type: UserActions.UserActionTypes.DeleteUserSuccess,
            payload: { id: action.payload.id }
          })),
          catchError(error =>
            of({ type: UserActions.UserActionTypes.Fail, payload: error })
          )
        )
      )
    );
}
