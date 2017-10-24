import { Component } from '@angular/core';
import { NavController, ModalController, Platform, AlertController } from 'ionic-angular';
import { AddListPage } from '../add-list/add-list';
import { EditPage } from '../edit/edit';
import { DatabaseProvider } from '../../providers/database/database'





@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  item_array : any;
  

	
   doRefresh(refresher) {
    console.log('Begin async operation', refresher);

    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }

  constructor(public navCtrl: NavController, public modalCtrl: ModalController,private platform: Platform,
   public databaseService: DatabaseProvider, public alertCtrl: AlertController) {
  this.platform.ready().then(() => {
  	this.databaseService.database_init();
    this.databaseService.display_database().then((result) => {
      this.item_array = result;
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
            this.databaseService.delete_details(id).then((result)=>{
              this.navCtrl.setRoot(HomePage);
            });
            this.showAlert();
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


}
