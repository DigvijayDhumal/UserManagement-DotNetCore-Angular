import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { MasterService } from '../../services/master.service';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css'
})
export class UserFormComponent implements OnInit {

  countries: any[] = [];
  states: any[] = [];
  cities: any[] = [];

  user = {
    userName: '',
    email: '',
    mobileNo: '',
    countryId: 0,
    stateId: 0,
    cityId: 0,
    password: ''
  };

  constructor(
    private userService: UserService,
    private masterService: MasterService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadCountries();
  }

  loadCountries() {
    this.masterService.getCountries().subscribe(res => {
      this.countries = res as any[];
    });
  }

  onCountryChange() {
    this.states = [];
    this.cities = [];
    this.user.stateId = 0;
    this.user.cityId = 0;

    this.masterService.getStates(this.user.countryId).subscribe(res => {
      this.states = res as any[];
    });
  }

  onStateChange() {
    this.cities = [];
    this.user.cityId = 0;

    this.masterService.getCities(this.user.stateId).subscribe(res => {
      this.cities = res as any[];
    });
  }

  saveUser() {
    this.userService.addUser(this.user).subscribe({
      next: () => {
        alert('User Added Successfully');
        this.router.navigate(['/users']);
      },
      error: () => alert('Error while adding user')
    });
  }

  cancel() {
    this.router.navigate(['/users']);
  }
}
