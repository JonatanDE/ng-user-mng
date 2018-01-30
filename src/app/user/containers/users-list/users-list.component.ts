import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

// store
import { Store } from '@ngrx/store';
import * as UserActions from '../../store/actions/user.actions';
import * as reducer from '../../../reducers';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit, OnDestroy {
  public users$: Observable<any>;
  public user$: Observable<any>;
  public total$: Observable<any>;
  private subscription: Subscription;
  private id: number;
  private inEdit = -1;
  private inAddMode = false;
  private showModal = false;

  constructor(private $store: Store<any>, private router: Router) {}

  ngOnInit() {
    this.users$ = this.$store.select(reducer.selectAllUsers);
    this.user$ = this.$store.select(reducer.selectCurrentUser);
    this.total$ = this.$store.select(reducer.selectUserTotal);
    this.subscription = this.user$
      .filter(Boolean)
      .subscribe(data => (this.id = data.id));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  public closeEdit() {
    this.inEdit = -1;
  }

  public editUser(id, index) {
    this.$store.dispatch(new UserActions.SelectUser(id));
    this.inEdit === index ? (this.inEdit = -1) : (this.inEdit = index);
    this.closeNewUserMode();
  }

  public addNewUserMode() {
    this.closeEdit();
    this.inAddMode = true;
  }

  public closeNewUserMode() {
    this.inAddMode = false;
  }

  public addUser(user) {
    this.$store.dispatch(new UserActions.AddUser({ user }));

    this.closeNewUserMode();
    this.closeEdit();
  }

  public updateUser(user) {
    this.$store.dispatch(
      new UserActions.UpdateUser({ user: { id: this.id, changes: user } })
    );

    this.closeEdit();
  }

  public hideModal() {
    this.showModal = false;
  }

  public deleteUserConfirm(id) {
    this.$store.dispatch(new UserActions.SelectUser(id));
    this.showModal = true;
  }

  public deleteUser() {
    this.$store.dispatch(new UserActions.DeleteUser({ id: this.id }));
    this.hideModal();
  }

  public viewUser(id) {
    this.$store.dispatch(new UserActions.SelectUser(id));
    this.router.navigate(['./users/detail', this.id]);
  }
}
