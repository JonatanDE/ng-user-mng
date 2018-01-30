import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-user-list-block',
  templateUrl: './user-list-block.component.html',
  styleUrls: ['./user-list-block.component.scss']
})
export class UserListBlockComponent implements OnInit {
  @Input() public user: User[];
  @Output() public viewUserEvent = new EventEmitter();
  @Output() public editUserEvent = new EventEmitter();
  @Output() public deleteUserEvent = new EventEmitter();

  constructor() {}

  ngOnInit() {
  }

  public editUser(id) {
    this.editUserEvent.emit(id);
  }

  public deleteUser(id) {
    this.deleteUserEvent.emit(id);
  }

  public viewUser(id) {
    this.viewUserEvent.emit(id);
  }
}
