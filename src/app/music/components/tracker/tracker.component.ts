import { Component, OnInit } from '@angular/core';
import { NewSongModel } from 'src/app/models/new-song.model';
import { MusicService } from '../../service/music.service';
import { WebsocketService } from 'src/app/shared/services/websocket.service';
import { SongDescriptionModel } from 'src/app/models/song-descrioption.model';
import { PlayStopResponseModel } from 'src/app/models/play-stop-response.model';

@Component({
  selector: 'app-tracker',
  templateUrl: './tracker.component.html',
  styleUrls: ['./tracker.component.css']
})
export class TrackerComponent implements OnInit {

  progressProcent: number;
  songTIme = '0:00 / 0:00';
  isPlaying = true;

  private currentSongId: number;

  constructor(
    private websocketService: WebsocketService,
    private musicService: MusicService
    ) { }

  ngOnInit(): void {
    this.currentSongId = -1;
    this.websocketService.create(this.loadData.bind(this));
    this.progressProcent = 0;
    this.musicService.getCurrentSong().subscribe(
      this.loadCurrentSong.bind(this),
      this.hangleCurrentSOngError );
    document.addEventListener("visibilitychange", () => {
      if (!document.hidden) {
        this.ngOnInit();
      }
});
  }

  loadCurrentSong(currentSong: SongDescriptionModel){
      this.progressProcent = 0;

      if (this.isPlaying) {
        this.repeatFunction(currentSong.songId, currentSong.songCurrentSample, currentSong.songMaxSample, currentSong.sampleRate);
      }
  }

  hangleCurrentSOngError(error: any){
    if (error.status === 400){
      this.isPlaying = false;
    }
  }

  loadData(newSong: NewSongModel) {

      const nextSong = newSong.nextSong;
      if(nextSong != null && nextSong.songId !== -1){
        this.progressProcent = 0;
        this.repeatFunction(nextSong.songId, nextSong.songCurrentSample, nextSong.songMaxSample, nextSong.sampleRate);
      }
  }

  public playStopSong(){
    this.musicService.playStopSong().subscribe(
      (resp: PlayStopResponseModel) => {
        this.isPlaying = resp.isPlaying;
        this.currentSongId = -1;
        if (this.isPlaying) {
          this.musicService.getCurrentSong().subscribe(
            this.loadCurrentSong.bind(this),
            this.hangleCurrentSOngError );
        }
      },
      (err) => {
        if(err.status === 400){
          this.isPlaying = false;
        }
      }
    )
  }

  public playNextSong(){
    this.isPlaying = true;
    this.musicService.playNextSong();
  }

  private repeatFunction(songId, start, end, sampleRate) {
    let currentSample = start;
    this.currentSongId = songId;
    this.progressProcent = 0;
    (function p(self, thisSongId) {
        if (self.currentSongId === thisSongId && currentSample < end) {
            self.songTIme = self.musicService.formatSongTime(currentSample / sampleRate, end / sampleRate);
            self.progressProcent = currentSample / end * 100;
            currentSample += sampleRate / 10;
            setTimeout(p, 100, self, songId);
        }
    })(this, songId);
  }

}
