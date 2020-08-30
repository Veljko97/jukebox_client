import { Component, OnInit } from '@angular/core';
import { NewSongModel } from 'src/app/models/new-song.model';
import { TrackerService } from '../../service/tracker.service';
import { WebsocketService } from 'src/app/shared/services/websocket.service';
import { SongDescriptionModel } from 'src/app/models/song-descrioption.model';

@Component({
  selector: 'app-tracker',
  templateUrl: './tracker.component.html',
  styleUrls: ['./tracker.component.css']
})
export class TrackerComponent implements OnInit {

  progressProcent: number;
  songTIme = '0:00 / 0:00';

  private currentSongId: number;

  constructor(
    private websocketService: WebsocketService,
    private trackerService: TrackerService
    ) { }

  ngOnInit(): void {
    this.websocketService.create(this.loadData.bind(this));
    this.progressProcent = 0;
    this.trackerService.getCurrentSong().subscribe((currentSong: SongDescriptionModel) => this.loadCurrentSong(currentSong) );
  }

  loadCurrentSong(currentSong: SongDescriptionModel){
    this.progressProcent = 0;

    this.repeatFunction(currentSong.songId, currentSong.songCurrentSample, currentSong.songMaxSample, currentSong.sampleRate)
  }


  loadData(newSong: NewSongModel) {
    this.progressProcent = 0;

    const nextSong = newSong.nextSong;
    this.repeatFunction(nextSong.songId, nextSong.songCurrentSample, nextSong.songMaxSample, nextSong.sampleRate);
  }

  private repeatFunction(songId, start, end, sampleRate) {
    let currentSample = start;
    this.currentSongId = songId;
    this.progressProcent = 0;
    (function p(self, thisSongId) {
        if (self.currentSongId === thisSongId && currentSample < end) {
            self.songTIme = self.trackerService.formatSongTime(currentSample / sampleRate, end / sampleRate);
            self.progressProcent = currentSample / end * 100;
            currentSample += sampleRate;
            setTimeout(p, 1000, self, songId);
        }
    })(this, songId);
  }

}
