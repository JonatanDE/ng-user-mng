import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  HostBinding
} from '@angular/core';
import { User } from '../../models/user.model';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {
  @HostBinding('class') classes = 'p-3 border-bottom border-gray bg-light';
  @Input() public user: Observable<User>;
  @Output() public updateUserEvent = new EventEmitter();
  @Output() public cancelUserEvent = new EventEmitter();

  public u: User;

  constructor() {}

  ngOnInit() {}

  uForm(data) {
    this.u = data;
  }

  update() {
    this.updateUserEvent.emit(this.u);
  }

  cancel() {
    this.cancelUserEvent.emit();
  }
}
