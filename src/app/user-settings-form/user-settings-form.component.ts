import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { DataService } from '../data/data.service';
import { UserSettings } from '../data/user-settings';

@Component({
  selector: 'app-user-settings-form',
  templateUrl: './user-settings-form.component.html',
  styleUrls: ['./user-settings-form.component.css'],
})
export class UserSettingsFormComponent implements OnInit {
  originalUserSettings: UserSettings = {
    name: '',
    emailOffers: false,
    interfaceStyle: 'light',
    subscriptionType: 'Monthly',
    notes: '',
  };
  postError = false;
  postErrorMessage = '';
  subscriptionTypes!: Observable<string[]>;
  startDate!: Date;

  userSettings: UserSettings = { ...this.originalUserSettings };

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.subscriptionTypes = this.dataService.getSubscriptionTypes();
    this.startDate = new Date();
  }

  onHttpError(err: any): void {
    console.log('error: ', err);
    this.postError = true;
    this.postErrorMessage = err.error.errorMessage;
  }

  onSubmit(form: NgForm): void {
    console.log(form.value);
    // if (form.valid) {
    //   this.dataService.postUserSettingsForm(this.userSettings).subscribe({
    //     next: (res) => console.log('success', res),
    //     error: this.onHttpError,
    //   });
    // } else {
    //   this.postError = true;
    //   this.postErrorMessage = 'Please fix the above errors';
    // }
  }
}
