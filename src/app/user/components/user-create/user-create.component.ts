import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { User } from '../../models/user.model';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss']
})
export class UserCreateComponent implements OnInit {
  @Input() public user: Observable<User>;
  @Output() public createUserEvent = new EventEmitter();
  @Output() public cancelUserEvent = new EventEmitter();

  public u: User;

  constructor() {}

  ngOnInit() {}

  uForm(data) {
    this.u = data;
  }

  create() {
    this.createUserEvent.emit(this.u);
  }

  cancel() {
    this.cancelUserEvent.emit();
  }
}
