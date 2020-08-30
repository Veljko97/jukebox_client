import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrackerComponent } from './components/tracker/tracker.component';
import { MusicRouting } from './music-routing';



@NgModule({
  declarations: [TrackerComponent],
  imports: [
    CommonModule,
    MusicRouting
  ]
})
export class MusicModule { }
