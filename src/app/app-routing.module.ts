import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddComponent } from './menus/add/add.component';
import { DeleteComponent } from './menus/delete/delete.component';
import { ShowComponent } from './menus/show/show.component';

const routes: Routes = [
  {
    path: 'add',
    component: AddComponent,
  },
  {
    path: 'del',
    component: DeleteComponent,
  },
  {
    path: '404',
    redirectTo: '',
    component: ShowComponent,
  },
  {
    path: '',
    component: ShowComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
