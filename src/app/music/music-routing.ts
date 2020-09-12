import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { TrackerComponent } from './components/tracker/tracker.component';
import { UploadMusicComponent } from './components/upload-music/upload-music.component';
import { QrCodeShowComponent } from './components/qr-code-show/qr-code-show.component';

const routes: Routes = [{
    path: '',
    component: TrackerComponent
  },
  {
    path: 'uploadMusic',
    component: UploadMusicComponent
  },
  {
    path: 'showQrCode',
    component: QrCodeShowComponent
  }
];

@NgModule({
    imports: [
      RouterModule.forChild(routes)
    ],
    exports: [
      RouterModule
    ]
  })
  export class MusicRouting { }