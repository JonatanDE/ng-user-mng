import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

// store
import { Store } from '@ngrx/store';
import * as reducer from '../../../reducers';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {
  public user$: Observable<any>;

  constructor(private $store: Store<any>) {}

  ngOnInit() {
    this.user$ = this.$store.select(reducer.selectCurrentUser);
  }
}
