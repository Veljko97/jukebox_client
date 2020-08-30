import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from 'src/app/shared/services/base.service';
import { map } from 'rxjs/operators';
import { NewSongModel } from 'src/app/models/new-song.model';
import { SongDescriptionModel } from 'src/app/models/song-descrioption.model';

const ENDPOINTS = {
  GET_CURRENT_SONG: '/music/getCurrentSong'
};

@Injectable({
  providedIn: 'root'
})
export class TrackerService extends BaseService {

  constructor(private http: HttpClient) {
    super();
  }



public getCurrentSong() {
  return this.http.get(`${this.baseUrl}${ENDPOINTS.GET_CURRENT_SONG}`).pipe(
    map((res: any) => {
      return (new SongDescriptionModel()).deserialize(res);
    })
  );
}


public formatSongTime(currentSeconds, endSeconds) {
  return this.formatTime(currentSeconds) + ' / ' + this.formatTime(Math.round(endSeconds));
}

private formatTime(duration) {

  const hours = Math.floor(duration / 3600);
  const minutes = Math.floor((duration - (hours * 3600)) / 60);
  let seconds: number|string = duration - (hours * 3600) - (minutes * 60);
  seconds = Math.trunc(seconds);
  seconds = seconds < 9 ? '0' + seconds : '' + seconds;
  return minutes + ':' + seconds;
}
}
