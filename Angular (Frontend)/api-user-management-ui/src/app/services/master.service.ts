import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class MasterService {

  private apiUrl = 'http://localhost:5118/api';

  constructor(private http: HttpClient) {}

  getCountries() {
    return this.http.get(`${this.apiUrl}/master/countries`);
  }

  getStates(countryId: number) {
    return this.http.get(`${this.apiUrl}/master/states/${countryId}`);
  }

  getCities(stateId: number) {
    return this.http.get(`${this.apiUrl}/master/cities/${stateId}`);
  }
}
