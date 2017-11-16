import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ActionSheetController, Platform, LoadingController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { DatabaseProvider } from '../../providers/database/database';
import { HomePage } from '../home/home';
import { FileSystemProvider } from '../../providers/file-system/file-system';
/**
 * Generated class for the EditPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit',
  templateUrl: 'edit.html',
})
export class EditPage {

  item = [];
  image:any;
  isIos = false;
  oldImage: any;


  constructor(public navCtrl: NavController, public navParams: NavParams, private camera: Camera, public alertCtrl: AlertController,
   public actionSheetCtrl: ActionSheetController, public databaseService: DatabaseProvider, public platform: Platform
   ,public fileService: FileSystemProvider, public loadingCtrl : LoadingController) {

  this.platform.ready().then(() => {
    this.item[0] = navParams.get('id');
    this.item[1] = navParams.get('name');
    this.item[2] = navParams.get('qty');
    this.item[3] = navParams.get('unit');
    this.item[4] = navParams.get('remark');
    this.image = navParams.get('image');
    this.oldImage = navParams.get('image');

});


	if (this.platform.is('ios')) {
		this.isIos = true;
		console.log('ios');

	}
	else if (this.platform.is('android')) {
		this.isIos = false;
		console.log('not ios');
	}

  }

   options: CameraOptions = {
  quality: 100,
  destinationType: this.camera.DestinationType.FILE_URI,
  encodingType: this.camera.EncodingType.JPEG,
  mediaType: this.camera.MediaType.PICTURE,
  sourceType: this.camera.PictureSourceType.CAMERA
}

cameraButton(){

this.camera.getPicture(this.options).then((imageUri) => {

	if (this.isIos == true) {
		 this.image = imageUri.replace(/^file:\/\//, '');
  }
  
  else{
      this.image = imageUri;
  }


}, (err) => {
 
 console.log('take photo error ') + err;
});
}


open_camera_library(){
  var options = {
    sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
    destinationType: this.camera.DestinationType.DATA_URL,
    mediaType: this.camera.MediaType.PICTURE
  };
  this.camera.getPicture(options).then((imageData) =>{
  this.image= 'data:image/jpeg;base64,' + imageData;

  },
  (err) =>{
    console.log('Open photo library error') + err;
  });
}

 presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Modify your photo',
      buttons: [
        { 
          icon: 'camera',
          text: 'Take photo',
          handler: () => {
            this.cameraButton();
            console.log('Take photo button clicked');
          }
        },{
          icon: 'images',
          text: 'Choose from library',
          handler: () => {
            this.open_camera_library();
            console.log('Choose from library');
          }
        },{
          icon: 'close',
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

  showConfirm(){
    let confirm = this.alertCtrl.create({
      title: 'Editing item..',
      message: 'Are you sure want to edit this item?',
      buttons: [
        {
          text: 'No',
          handler: () => {
            console.log('No clicked');
          }
        },
        {
          text: 'Yes',
          handler: () => {
            this.leavePage();
            console.log('Yes clicked');
          }
        }
      ]
    });
    confirm.present();
  }


leavePage(){


if (this.image == this.oldImage) {
	this.databaseService.update_details(this.item[0],this.item[1],this.item[2],this.item[3],this.item[4],this.oldImage)
	.then((result)=>{
		this.navCtrl.setRoot(HomePage);

	});
}

else{
	this.fileService.copyFile(this.image);
	this.fileService.deleteCacheFile(this.oldImage);
	this.fileService.deleteFile(this.oldImage);
	this.databaseService.update_details(this.item[0],this.item[1],this.item[2],this.item[3],this.item[4],this.image)
	.then((result)=>{
		this.navCtrl.setRoot(HomePage);

})
}



this.navCtrl.pop();
this.presentLoading("Please wait",3000,1);


}

  showAlert() {
    let alert = this.alertCtrl.create({
      title: 'Done!',
      subTitle: 'Your item has been edited!',
      buttons: ['OK']
    });
    alert.present();
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad EditPage');
  }


delete_button(id){
let confirm = this.alertCtrl.create({
      title: 'Deleting?',
      message: 'Are you sure you want to delete?',
      buttons: [
        {
          text: 'No',
          handler: () => {
            console.log('No clicked');
          }
        },
        {
          text: 'Yes',
          handler: () => {
            this.databaseService.delete_details(id).then((result)=>{
              this.navCtrl.setRoot(HomePage);
            });
            this.fileService.deleteFile(this.image);
            this.fileService.deleteCacheFile(this.image);
            this.presentLoading("Please wait",3000, 2);
            console.log('Yes clicked');
          }
        }
      ]
    });
    confirm.present();
  }

  confirmDeleteAlert() {
    let alert = this.alertCtrl.create({
      title: 'Done!',
      subTitle: 'Your item has been deleted!',
      buttons: ['OK']
    });
    alert.present();
  }


  presentLoading(msg,time,alert) {
    
    let loader = this.loadingCtrl.create({
      content: msg,
      duration: time
    });
    
    loader.onDidDismiss(() => {
      if(alert == 1){
        this.showAlert();
      }
      else if(alert == 2){
        this.confirmDeleteAlert();
      }
    });
    loader.present();
  }


  

}
