import { Injectable } from '@angular/core';
import { config } from '../config';

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  baseUrl: string;
  host: string;

  constructor() {
    this.baseUrl = config.getApiUrl();
    this.host = config.getHostName();
  }
}
