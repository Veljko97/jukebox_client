import { Injectable } from '@angular/core';
import { config } from '../config';

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  baseUrl: string;
  baseUrlLocked: string;
  host: string;

  constructor() {
    this.baseUrl = config.getApiUrl();
    this.baseUrlLocked = this.baseUrl + '/lock';
    this.host = config.getHostName();
  }
}
