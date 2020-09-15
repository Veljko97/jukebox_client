import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrackerComponent } from './components/tracker/tracker.component';
import { MusicRouting } from './music-routing';
import { UploadMusicComponent } from './components/upload-music/upload-music.component';
import { DragDropDirective } from './directives/drag-drop.directive';
import { FormsModule } from '@angular/forms';
import { QRCodeModule } from 'angularx-qrcode';
import { QrCodeShowComponent } from './components/qr-code-show/qr-code-show.component';
import { MaterialModule } from '../shared/material-module';



@NgModule({
  declarations: [TrackerComponent, UploadMusicComponent, DragDropDirective, QrCodeShowComponent],
  imports: [
    CommonModule,
    MusicRouting,
    FormsModule,
    QRCodeModule,
    MaterialModule
  ],
  exports:[DragDropDirective]
})
export class MusicModule { }
