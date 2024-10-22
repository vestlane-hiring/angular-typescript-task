import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DetailsComponent } from './details/details.component';

const routeConfig: Routes = [
    {
      path: '',
      component: HomeComponent,
      title: 'Angular Task: List'
    },
    {
      path: 'details/:id',
      component: DetailsComponent,
      title: 'Angular Task: Details'
    }
];
  
export default routeConfig;
