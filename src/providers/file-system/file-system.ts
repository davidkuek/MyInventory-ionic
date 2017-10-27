import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { File } from '@ionic-native/file';

/*
  Generated class for the FileSystemProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FileSystemProvider {



  constructor(public http: Http, private file: File) {
    console.log('Hello FileSystemProvider Provider');
  }

  copyFile(imagePath){

    if (imagePath==undefined) {
      console.log('No file to copied');
    }
    else{
  let path = this.file.externalCacheDirectory;
  let fileName = imagePath.split("/").pop("cache");
  let newPath = this.file.externalDataDirectory;
  let newFileName = fileName;

this.file.copyFile(path, fileName, newPath, newFileName)
.then(() => console.log('copied'))
.catch(err => console.log(err))
    }

}



deleteFile(imagePath){
   if (imagePath==undefined) {
      console.log('No file to delete');
    }
    else{
  let path = this.file.externalDataDirectory;
  let fileName = imagePath.split("/").pop("cache");
  

this.file.removeFile(path, fileName)
.then(() => console.log('deleted'))
.catch(err => console.log(err))
    }
}

deleteCacheFile(imagePath){
   if (imagePath==undefined) {
      console.log('No cache file to delete');
    }
    else{
  let path = this.file.externalCacheDirectory;
  let fileName = imagePath.split("/").pop("cache");
  

this.file.removeFile(path, fileName)
.then(() => console.log('cache file deleted'))
.catch(err => console.log(err))
    }
} 

}

