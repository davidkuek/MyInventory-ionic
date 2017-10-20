import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { SQLitePorter } from '@ionic-native/sqlite-porter';

/*
  Generated class for the DatabaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DatabaseProvider {

  constructor(public http: Http, private sqlitePorter: SQLitePorter) {
    console.log('Hello DatabaseProvider Provider');
  }
   db = (< any > window).openDatabase('Test', '1.0', 'TestDB', 1 * 1024);

  create_database(){

	let sql = 'CREATE TABLE IF NOT EXISTS Item_list' +  
			'([Id] INTEGER PRIMARY KEY AUTOINCREMENT, [Name] TEXT,[Quantity] NUMBER, [Uom] INTERGER, [Remark] TEXT, [Image] TEXT);' 

this.sqlitePorter.importSqlToDb(this.db, sql)
  .then(() => console.log('Created'))
  .catch(e => console.error(e));
  }


  add_database(item1,item2,item3,item4,item5){

  	let sql = 'INSERT INTO Item_List(Name, Quantity, Uom, Remark, Image) VALUES ("' + 
  				item1 + '", "' + 
  				item2 + '", "' + 
  				item3 + '", "' + 
  				item4 + '", "' + 
  				item5 + '");'

  this.sqlitePorter.importSqlToDb(this.db, sql)
  .then(() => console.log('Imported'))
  .catch(e => console.error(e));

  }

  display_database(){

  }

}
