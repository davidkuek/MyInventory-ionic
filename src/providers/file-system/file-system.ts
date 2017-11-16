import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { File } from '@ionic-native/file';
import { Platform} from 'ionic-angular';

/*
  Generated class for the FileSystemProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FileSystemProvider {

	isIos = false;



  constructor(public http: Http, private file: File, public platform : Platform) {
    console.log('Hello FileSystemProvider Provider');

    	if (this.platform.is('ios')) {
		this.isIos = true;
	}
	else if (this.platform.is('android')) {
		this.isIos = false;
	}
  }

  copyFile(imagePath){

  	let path;
  	let fileName;
  	let newPath;
  	let newFileName;

    if (imagePath==null) {
      console.log('No file to copied');
    }

    else if (this.isIos == true){
    	path = this.file.tempDirectory;
    	fileName = imagePath.split("/").pop("tmp");
    	newPath = this.file.documentsDirectory;
		newFileName = fileName;
		
		this.file.copyFile(path, fileName, newPath, newFileName)
		.then(() => console.log('copied from cache or tmp'))
		.catch(err => console.log(err))
	}
	
	else{
			
		path = this.file.externalCacheDirectory;
		fileName = imagePath.split("/").pop("cache");
		newPath = this.file.dataDirectory;
		newFileName = fileName;

		this.file.copyFile(path, fileName, newPath, newFileName)
		.then(() => console.log('copied from cache or tmp'))
		.catch(err => console.log(err))
	}


}



deleteFile(imagePath){
  	let path;
  	let fileName;

   if (imagePath==undefined) {
      console.log('No file to delete');
   }

    else if (this.isIos == true){
    	fileName = imagePath.split("/").pop("tmp");
		path = this.file.documentsDirectory;
		
		this.file.removeFile(path, fileName)
		.then(() => console.log('data file deleted'))
		.catch(err => console.log(err))
    }

	else{
		path = this.file.dataDirectory;
		fileName = imagePath.split("/").pop("cache");

		this.file.removeFile(path, fileName)
		.then(() => console.log('data file deleted'))
		.catch(err => console.log(err))
	}
  
    }


deleteCacheFile(imagePath){

  	let path;
  	let fileName;

   if (imagePath==undefined) {
      console.log('No cache file to delete');
    }

    else if (this.isIos == true){
    	path = this.file.tempDirectory;
    	fileName = imagePath.split("/").pop("tmp");

		this.file.removeFile(path, fileName)
		.then(() => console.log('cache or tmp file deleted'))
		.catch(err => console.log(err))
	}
	
	else{
		path = this.file.externalCacheDirectory;
		fileName = imagePath.split("/").pop("cache");

		this.file.removeFile(path, fileName)
		.then(() => console.log('cache or tmp file deleted'))
		.catch(err => console.log(err))
	}

    
} 

}

