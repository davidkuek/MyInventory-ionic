import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule, ActionSheetController } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { FormsModule, RequiredValidator } from '@angular/forms';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { AddListPage } from '../pages/add-list/add-list';
import { EditPage } from '../pages/edit/edit';
import { Camera } from '@ionic-native/camera';
import { SQLitePorter } from '@ionic-native/sqlite-porter';
import { DatabaseProvider } from '../providers/database/database';
import { HttpModule } from '@angular/http';
import { SQLite } from '@ionic-native/sqlite';
import { FileSystemProvider } from '../providers/file-system/file-system';
import { File } from '@ionic-native/file';




@NgModule({
  declarations: [
    MyApp,
    HomePage,
    AddListPage,
    EditPage
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
    AddListPage,
    EditPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    ActionSheetController,
    SQLitePorter,
    SQLite,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DatabaseProvider,
    FileSystemProvider,
    RequiredValidator,
    File
    
  ]
})
export class AppModule {}
