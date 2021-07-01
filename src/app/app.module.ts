import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router'

import { AppComponent } from './app.component';
import { CalendarComponent } from './components/calendar.component/calendar.component';
import { ListComponent } from './components/list.component/list.component';
import { TableComponent } from './components/table.component/table.component';
import { CellComponent } from './components/table.component/cell.component/cell.component';
import { FormComponent } from './components/form.component/form.component';
import { InfoComponent } from './components/info.component/info.component';
import { RegistrationComponent } from './components/registratiom.component/registration.component';

import { CalendarService } from './services/calendar.service';


const routes: Routes = [
  { path: '', component: RegistrationComponent  },
  { path: 'calendar', component: CalendarComponent  },
  { path: 'cell', component: CellComponent },
  { path: 'form', component: FormComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [ 
    BrowserModule,
    FormsModule, 
    RouterModule.forRoot(routes)
    ],
  declarations: [
    AppComponent,
    CalendarComponent,
    ListComponent,
    TableComponent,
    CellComponent,
    FormComponent,
    InfoComponent,
    RegistrationComponent
  ],
  bootstrap:    [ AppComponent ],
  providers: [ CalendarService]
})
export class AppModule { }
