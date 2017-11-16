import { Component } from '@angular/core';
import { NavController, ModalController, Platform, AlertController, LoadingController } from 'ionic-angular';
import { AddListPage } from '../add-list/add-list';
import { EditPage } from '../edit/edit';
import { DatabaseProvider } from '../../providers/database/database';
import { FileSystemProvider } from '../../providers/file-system/file-system';






@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  item_array = [];
  total_count = {};
 
  
  
 

  constructor(public navCtrl: NavController, public modalCtrl: ModalController,private platform: Platform,
   public databaseService: DatabaseProvider, public alertCtrl: AlertController,public fileService: FileSystemProvider,
  public loadingCtrl : LoadingController) {


  this.platform.ready().then(() => {

    this.databaseService.database_init();
    this.getting_item_count();
      this.databaseService.display_database().then((result) => {

        if (this.total_count>10) {
           for (let i = 0; i < 10; i++) {
               this.item_array.push(result[i]);
           }
         }

         else{
           for (let i = 0; i < this.total_count; i++) {
             this.item_array.push(result[i]);
           }
         }
    },(error) =>{
      console.log(error);
    });

});
  }



    add_list() {
    this.navCtrl.push(AddListPage);
  }

edit_button_click(id){
  this.databaseService.display_item_details(id).then((result) =>{
    this.navCtrl.push(EditPage,{
      id: result[0],
      name: result[1],
      qty: result[2],
      unit: result[3],
      remark: result[4],
      image: result[5]
    });
  })

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
            this.databaseService.display_item_details(id).then((result) =>{
              this.fileService.deleteFile(result[5]);
              this.fileService.deleteCacheFile(result[5]);
            });
            this.databaseService.delete_details(id).then((result)=>{
              this.navCtrl.setRoot(HomePage);
            });
            this.presentLoading("Please wait", 2000);
            console.log('Yes clicked');
          }
        }
      ]
    });
    confirm.present();
  }

  showAlert() {
    let alert = this.alertCtrl.create({
      title: 'Done!',
      subTitle: 'Your item has been deleted!',
      buttons: ['OK']
    });
    alert.present();
  }
  doInfinite(infiniteScroll) {
    console.log('Begin async operation');

    setTimeout(() => {
      this.databaseService.display_database().then((result) => {
        
        let min = this.item_array.length;
        let max = min + 10;
      
      for (var i = min; i < max; i++) {
        if (result[i] == undefined) {
          infiniteScroll.enable(false);
        }
        else{
        this.item_array.push(result[i]);
      }

      }
      // this.loadItemList(this.item_array.length, result);

      
    },(error) =>{
      console.log(error);
    });

      console.log('Async operation has ended');
      infiniteScroll.complete();
    }, 500);
  }


// loadItemList(start, result){
  
//   this.getting_item_count();
//     let end = start + 10;
//     let itemVisibleLength = this.total_count;
//     console.log(start)
//     console.log('item length: ' + itemVisibleLength)
//     console.log(result)
//     console.log('item result: ' + this.item_array)
    
//     if(itemVisibleLength > end){
//         for(let i=start; i <= end; i++){
//             this.item_array.push(result[i]);
//             console.log('1')
//         }
//     }else{
//         for(let i=start; i <= itemVisibleLength; i++){
//            this.item_array.push(result[i]);
//            console.log('2')
//         }
// }
// }


  getItems(ev: any) {

    let val = ev.target.value;
    this.item_array.length = 0;
    this.getting_item_count();
    if (val && val.trim() != '') {
          this.databaseService.search_item_list(val).then((result)=>{

       for (var i = 0; i < this.total_count; i++) {
         if (result[i] != undefined) {
           this.item_array.push(result[i]);
           
         }
        
         
    }

    })
  }

  else{
    this.navCtrl.setRoot(HomePage);
  }
  }

  getting_item_count(){
    this.databaseService.count_item().then((result)=>{
      this.total_count = result;
      
    })
  }

  presentLoading(msg,time) {
    let loader = this.loadingCtrl.create({
      content: msg,
      duration: time
    });
    loader.onDidDismiss(() => {
      this.showAlert();
    });
    loader.present();
  }
  

}
