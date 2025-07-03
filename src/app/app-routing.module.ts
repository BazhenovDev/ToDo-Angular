import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MainComponent} from "./views/main/main.component";
import {LayoutComponent} from "./shared/layout/layout.component";

const routes: Routes = [
  {
    path: 'tasks', component: LayoutComponent,
    children: [
      {path: '', component: MainComponent},
      {
        path: '',
        loadChildren: () => import('./views/pages/pages.module')
          .then(m => m.PagesModule)
      },
      {path: '**', redirectTo: '/tasks'},
    ]
  },
  { path: '', redirectTo: '/tasks', pathMatch: 'full' },
  {path: '**', redirectTo: '/tasks'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
