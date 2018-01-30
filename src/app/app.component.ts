import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import * as UserActions from './user/store/actions/user.actions';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private $store: Store<any>) {}

  ngOnInit() {
    // can be done in router resolve
    this.$store.dispatch(new UserActions.LoadUsers());
  }
}
