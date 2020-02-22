import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from '../../../core/guards';
import {MainContentComponent} from './pages/main-content.component';

const routes: Routes = [
  {
    path: '',
    component: MainContentComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Dashboard'
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class MainContentRoutingModule {
}
