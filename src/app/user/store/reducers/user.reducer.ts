import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { User } from '../../models/user.model';
import { UserActions, UserActionTypes } from '../actions/user.actions';

export interface State extends EntityState<User> {
  selectedUserId: number | null;
}

export const adapter: EntityAdapter<User> = createEntityAdapter<User>({
  selectId: (user: User) => user.id
});

export const initialState: State = adapter.getInitialState({
  selectedUserId: null,
  ids: []
});

export function reducer(state = initialState, action: UserActions): State {
  switch (action.type) {
    case UserActionTypes.AddUserSuccess: {
      return adapter.addOne(action.payload.user, state);
    }

    case UserActionTypes.UpdateUserSuccess: {
      return adapter.updateOne(action.payload.user, state);
    }

    case UserActionTypes.DeleteUserSuccess: {
      return adapter.removeOne(action.payload.id, state);
    }

    case UserActionTypes.LoadUsersSuccess: {
      return adapter.addAll(action.payload.users, state);
    }

    case UserActionTypes.ClearUsers: {
      return adapter.removeAll(state);
    }

    case UserActionTypes.SelectUser: {
      return {
        ...state,
        selectedUserId: action.payload
      };
    }

    default: {
      return state;
    }
  }
}

export const getSelectedUserId = (state: State) => state.selectedUserId;

export const {
  selectIds: selectUserIds,
  selectEntities: selectUserEntities,
  selectAll: selectAllUsers,
  selectTotal: selectUserTotal
} = adapter.getSelectors();
