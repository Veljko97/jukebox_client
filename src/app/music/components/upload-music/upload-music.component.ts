import { Component, OnInit } from '@angular/core';
import { MusicService } from '../../service/music.service';
import { MessageService } from 'src/app/shared/services/message.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-upload-music',
  templateUrl: './upload-music.component.html',
  styleUrls: ['./upload-music.component.css']
})
export class UploadMusicComponent implements OnInit {


  public songFiles: File[];
  public songLinks: string[];

  public nextLink = '';
  private filedsDone = true;
  private linksDone = true;

  constructor(
    private musicService: MusicService,
    private messageService: MessageService,
    private ngxLoader: NgxUiLoaderService
    ) {
      this.songFiles = [];
      this.songLinks = [];
     }

  ngOnInit(): void {
  }

  public uploadFile(event){
    for (let file of event){
      var ext: string = file.name.split('.').pop();
      if(ext.toLowerCase() !== "mp3"){
        this.messageService.showError(`${file.name} is ont a mp3 file`, 'Only MP3 files are allowed');
      } else {
        let flag = false;
        for ( let addedFIle of this.songFiles) {
          if (addedFIle.name === file.name){
            this.messageService.showError(`${file.name} is already added`, 'Only MP3 files are allowed');
            flag = true;
            break;
          }
        }
        if (!flag) {
          this.songFiles.push(file);
        }
      }
    }
  }

  public changeYoutubeLink(event){
    if (event.charCode === 44){  // 44 == ,
      event.preventDefault();
      this.checkLing();
    }
  }

  public saveFiles(){
    this.linksDone = false;
    this.filedsDone = false;
    this.ngxLoader.start();
    this.checkLing(false);
    this.musicService.uploadSongFiles(this.songFiles).subscribe(
      (res) => {
        for (const[key, value] of Object.entries(res)) {
          if (value != null && value.length > 0) {
            this.messageService.showError(key, 'Fail');
          }
        }
        this.filedsDone = true;
        this.checkIfUploadDone();
        this.ngxLoader.stop();
      }
    );
    this.musicService.uploadYouTubeSongs(this.songLinks).subscribe(
      (res) => {
        for (const[key, value] of Object.entries(res)) {
          if (value != null && value.length > 0) {
            this.messageService.showError(key, 'Fail');
          }
        }
        this.linksDone = true;
        this.checkIfUploadDone();
        this.ngxLoader.stop();
      }
    );
  }

  public removeFile(index){
    this.songFiles.splice(index, 1);
  }

  public removeLink(index){
    this.songLinks.splice(index, 1);
  }

  checkIfUploadDone(){
    if(this.linksDone && this.filedsDone){
      this.ngxLoader.stop();
      this.songFiles = [];
      this.songLinks = [];
      this.nextLink = '';
    }
  }

  checkLing(showError = true){
    if (this.nextLink.length !== 0 && this.musicService.checkYoutubelink(this.nextLink)) {
      this.songLinks.push(this.nextLink);
    } else {
      if (showError){
        this.messageService.showError('Not a youtube link', 'Error');
      }
    }
    this.nextLink = '';
  }

}
