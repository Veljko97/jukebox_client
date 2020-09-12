import { Component, OnInit, ViewChild } from '@angular/core';
import { QRCodeComponent } from 'angularx-qrcode';
import { MusicService } from '../../service/music.service';

@Component({
  selector: 'app-qr-code-show',
  templateUrl: './qr-code-show.component.html',
  styleUrls: ['./qr-code-show.component.css']
})
export class QrCodeShowComponent implements OnInit {

  public link: string;
  public serverKey = 'temp';

  @ViewChild("qrcode", {static : true}) qrcode: QRCodeComponent;

  constructor(
    private musicService: MusicService
  ) { }

  ngOnInit(): void {
    this.musicService.getServerKey().subscribe(
      (res) => {
        this.serverKey = res['serverKey'];
      }
    )
  }

  dlDataUrlBin(){
    this.link = this.qrcode.qrcElement.nativeElement.firstChild.src;
  }

}
