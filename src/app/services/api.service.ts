import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { settings } from 'src/settings';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  public domainUrl: string;
  constructor(public http: HttpClient) {
    this.domainUrl = settings.apiUrl;
  }
}
