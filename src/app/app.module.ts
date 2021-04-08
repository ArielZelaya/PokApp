import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { PokeDetailComponent } from './components/poke-detail/poke-detail.component';
import { PokeTableComponent } from './components/poke-table/poke-table.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
/* My imports */
import { MaterialModule } from 'src/shared/material.module';
import { HttpClientModule } from '@angular/common/http';
import {AngularFireModule} from '@angular/fire';
import { HomeComponent } from './components/home/home.component';
import { FirebaseService } from './services/firebase.service';


@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    PokeDetailComponent,
    PokeTableComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyBb6p0GTtmmwmOZRoB9NwvlCE4wvkzUPEQ",
      authDomain: "pokapp-auth.firebaseapp.com",
      projectId: "pokapp-auth",
      storageBucket: "pokapp-auth.appspot.com",
      messagingSenderId: "859740831127",
      appId: "1:859740831127:web:86c041fcafa931da9898d2"
    })
  ],
  providers: [FirebaseService],
  bootstrap: [AppComponent]
})
export class AppModule { }
