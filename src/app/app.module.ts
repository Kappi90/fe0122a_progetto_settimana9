import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { Route, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CompletedPage } from './completati/completati.component';
import { TodosPage } from './todos/todos.component';

const routes:Route[]=[
  {
    path:"",
    component: TodosPage
  },
  {
    path:"completati",
    component:CompletedPage
  }
]


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    TodosPage,
    CompletedPage
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
