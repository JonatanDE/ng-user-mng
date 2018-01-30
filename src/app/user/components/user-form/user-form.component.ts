import {
  Component,
  OnChanges,
  OnDestroy,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/filter';

import * as UserActions from '../../store/actions/user.actions';
import { User, UserFields } from '../../models/user.model';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnChanges, OnDestroy {
  @Input() public user: User;
  @Output() public userData = new EventEmitter();
  @Output() public valid = new EventEmitter();

  public userForm: FormGroup;
  public fieldsForm: object;

  private subscription: Subscription;
  private fields: object[];

  constructor(private fb: FormBuilder) {
    this.fields = UserFields;
    this.fieldsForm = {};

    this.fields.forEach((value: any) => {
      this.fieldsForm[value.field] = ['', Validators.required];
    });

    this.createForm();

    this.subscription = this.userForm.valueChanges
      .debounceTime(300)
      .filter(data => this.userForm.valid)
      .subscribe(data => {
        this.userData.emit(data);
        this.valid.emit();
      });
  }

  ngOnChanges() {
    if (this.user) {
      const data = {};
      this.fields.map((value: any) => {
        data[value.field] = this.user[value.field] || '';
      });

      this.userForm.setValue(data);
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  public createForm() {
    this.userForm = this.fb.group(this.fieldsForm);
  }
}
