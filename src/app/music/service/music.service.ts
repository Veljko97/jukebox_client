import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from 'src/app/shared/services/base.service';
import { map } from 'rxjs/operators';
import { NewSongModel } from 'src/app/models/new-song.model';
import { SongDescriptionModel } from 'src/app/models/song-descrioption.model';
import { PlayStopResponseModel } from 'src/app/models/play-stop-response.model';

const ENDPOINTS = {
  PLAY_STOP_SONG: '/music/playStop',
  GET_CURRENT_SONG: '/music/getCurrentSong',
  PLAY_NEXT_SONG: '/music/nextSong',
  UPLOAD_SONGS: '/music/addMusic',
  UPLOAD_YOUTUBE_SONGS: '/music/youTubeDownload',
  GET_SERVER_KEY: '/music/getServerKey'
};

@Injectable({
  providedIn: 'root'
})
export class MusicService extends BaseService {

  constructor(private http: HttpClient) {
    super();
  }

public playStopSong() {
  return this.http.put(`${this.baseUrlLocked}${ENDPOINTS.PLAY_STOP_SONG}`, null).pipe(
    map((res:any) => {
      return (new PlayStopResponseModel()).deserialize(res);
    })
  );
}

public getCurrentSong() {
  return this.http.get(`${this.baseUrl}${ENDPOINTS.GET_CURRENT_SONG}`).pipe(
    map((res: any) => {
      return (new SongDescriptionModel()).deserialize(res);
    })
  );
}

public playNextSong() {
  this.http.put(`${this.baseUrlLocked}${ENDPOINTS.PLAY_NEXT_SONG}`, null).subscribe();
}

public uploadSongFiles(files: File[]){
  const formData: FormData = new FormData();
  for (const file of files ) {
    formData.append('songs', file, file.name);
  }
  return this.http.post(`${this.baseUrlLocked}${ENDPOINTS.UPLOAD_SONGS}`, formData)
  .pipe(
    map((res) => res)
  );
}

public uploadYouTubeSongs(linkArray: string[]){
  return this.http.post(`${this.baseUrlLocked}${ENDPOINTS.UPLOAD_YOUTUBE_SONGS}`, JSON.stringify({links: linkArray}))
  .pipe(
    map((res) => res)
  );
}

public getServerKey() {
  return this.http.get(`${this.baseUrl}${ENDPOINTS.GET_SERVER_KEY}`);
}

public checkYoutubelink(link: string){
  const regExp = '(?:[?&]v=|\/embed\/|\/1\/|\/v\/|https:\/\/(?:www\.)?youtu\.be\/)([^&\n?#]+)';
  return link.match(regExp);
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
