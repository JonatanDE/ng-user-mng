import { Routes, RouterModule } from '@angular/router';

// error pages
import { PageNotFoundComponent } from './core/containers/not-found';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/users',
    pathMatch: 'full'
  },

  { path: '**', component: PageNotFoundComponent }
];

export const Routing = RouterModule.forRoot(routes, { useHash: true });
