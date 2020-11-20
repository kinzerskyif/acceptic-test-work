import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FolderComponent } from './components/folder/folder.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { HomeComponent } from './components/home/home.component';
import { RouterModule } from '@angular/router';

const config = {
  apiKey: 'AIzaSyADBQ6KtD6jtl52xXYPNQpo8e3QxvB6LcQ',
  authDomain: 'acceptic-test-work.firebaseapp.com',
  databaseURL: 'https://acceptic-test-work.firebaseio.com',
  projectId: 'acceptic-test-work',
  storageBucket: 'acceptic-test-work.appspot.com',
  messagingSenderId: '259877810405',
  appId: '1:259877810405:web:4e5d9d8f981946d2cb640c'
};

@NgModule({
  declarations: [
    AppComponent,
    FolderComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule,
    HttpClientModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(config),
    AngularFirestoreModule, // firestore
    AngularFireAuthModule, // auth
    AngularFireStorageModule // storage
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
