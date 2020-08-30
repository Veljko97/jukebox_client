import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { TrackerComponent } from './components/tracker/tracker.component';

const routes: Routes = [{
    path: '',
    component: TrackerComponent
  }];

@NgModule({
    imports: [
      RouterModule.forChild(routes)
    ],
    exports: [
      RouterModule
    ]
  })
  export class MusicRouting { }