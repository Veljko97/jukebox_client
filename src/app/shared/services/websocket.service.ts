import { Injectable } from '@angular/core';
import { WebSocketSubject, webSocket } from 'rxjs/webSocket';
import { NewSongModel } from '../../models/new-song.model';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService extends BaseService {

  constructor() {
    super();
  }

  private websocket: WebSocketSubject<NewSongModel>;

  public create(callback: (NewSongModel) => void ) {
    this.websocket = webSocket(`ws://${this.host}/ws/music`);
    this.websocket.asObservable().subscribe(newData => {
      console.log(newData);
      callback(newData);
    });
  }
}
