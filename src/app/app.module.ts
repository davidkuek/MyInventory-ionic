import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule, ActionSheetController } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { FormsModule } from '@angular/forms';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { AddListPage } from '../pages/add-list/add-list';
import { Camera } from '@ionic-native/camera';
import { SQLitePorter } from '@ionic-native/sqlite-porter';
import { DatabaseProvider } from '../providers/database/database';
import { HttpModule } from '@angular/http';




@NgModule({
  declarations: [
    MyApp,
    HomePage,
    AddListPage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    FormsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    AddListPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    ActionSheetController,
    SQLitePorter,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DatabaseProvider
    
  ]
})
export class AppModule {}
