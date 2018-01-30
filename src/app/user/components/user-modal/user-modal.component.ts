import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-user-modal',
  templateUrl: './user-modal.component.html',
  styleUrls: ['./user-modal.component.scss']
})
export class UserModalComponent implements OnInit {
  @Input() public user: User;
  @Output() public cancelEvent = new EventEmitter();
  @Output() public proceedEvent = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  public cancel() {
    this.cancelEvent.emit();
  }

  public proceed() {
    this.proceedEvent.emit();
  }

}
