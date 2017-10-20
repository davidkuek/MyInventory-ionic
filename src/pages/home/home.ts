import { Component } from '@angular/core';
import { NavController, ModalController, Platform } from 'ionic-angular';
import { AddListPage } from '../add-list/add-list';
import { DatabaseProvider } from '../../providers/database/database'





@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
	

  constructor(public navCtrl: NavController, public modalCtrl: ModalController,private platform: Platform, public databaseService: DatabaseProvider) {
  this.platform.ready().then(() => {
  	this.databaseService.create_database();
});
  }

    add_list() {
    this.navCtrl.push(AddListPage);
  }



}
