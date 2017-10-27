import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
/*
  Generated class for the DatabaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

@Injectable()
export class DatabaseProvider {

  constructor(public http: Http, private sqlite: SQLite) {
    console.log('Hello DatabaseProvider Provider');
  }




  database_init(){
    this.create_database();
    // this.create_uom_table();
    // this.add_uom_list();
  }



  create_database(){

this.sqlite.create({
  name: 'test.db',
  location: 'default'
})
  .then((db: SQLiteObject) => {


    let query1 = 'CREATE TABLE IF NOT EXISTS ITEM_LIST ' +  
                 '([id] INTEGER PRIMARY KEY AUTOINCREMENT, [name] TEXT,[quantity] NUMBER, [uom] INTERGER, [remark] TEXT, [image] TEXT);';

    let query2 = 'CREATE TABLE IF NOT EXISTS UOM_LIST ' + 
                 '([id] INTEGER, [desc] TEXT);';

    let query3 = 'INSERT INTO UOM_LIST(id,desc) SELECT "1", "Piece" ' + 
                 'WHERE NOT EXISTS(SELECT 1 FROM UOM_LIST WHERE id = "1" AND desc = "Piece");';  

    let query4 = 'INSERT INTO UOM_LIST(id,desc) SELECT "2", "Pack" ' + 
                 'WHERE NOT EXISTS(SELECT 1 FROM UOM_LIST WHERE id = "2" AND desc = "Pack");';

    let query5 = 'INSERT INTO UOM_LIST(id,desc) SELECT "3", "Bottle" ' + 
                 'WHERE NOT EXISTS(SELECT 1 FROM UOM_LIST WHERE id = "3" AND desc = "Bottle");';

    db.transaction((tx) =>{
    tx.executeSql(query1);
    tx.executeSql(query2);
    tx.executeSql(query3,[]);
    tx.executeSql(query4,[]);
    tx.executeSql(query5,[]);
      
    })
  .then(() => console.log('Database created'));
  })
  .catch(e => console.log(e));
  }



  add_item(name,quantity,uom,remark,image){
    return new Promise((resolve,reject) =>{
  this.sqlite.create({
  name: 'test.db',
  location: 'default'
})
  .then((db: SQLiteObject) => {

    let query = 'INSERT INTO ITEM_LIST(name, quantity, uom, remark, image) VALUES (?,?,?,?,?);';
  db.executeSql(query,[name,quantity,uom,remark,image])

   .then((data) => {
     resolve(data)},
     (error) =>{
       reject(error);
     })
 })
   .catch(e => console.error(e));
    })

  }



  display_database(){
    return new Promise((resolve,reject) => {
      this.sqlite.create({
        name: 'test.db',
        location: 'default'
      })
      .then((db: SQLiteObject) => {

          let output = [];
          let query = 'SELECT ITEM_LIST.NAME, ITEM_LIST.QUANTITY,ITEM_LIST.ID, ITEM_LIST.IMAGE, UOM_LIST.DESC FROM ITEM_LIST ' + 
                      'INNER JOIN UOM_LIST ON UOM_LIST.ID=ITEM_LIST.UOM;';
          db.executeSql(query,[])
          .then((results) => {


             if (results.rows.length > 0) {
                for (var i = 0; i < results.rows.length; i++) {
          
          output[i] = [];
          output[i].push(results.rows.item(i).id, 
                         results.rows.item(i).name,
                         results.rows.item(i).quantity,
                         results.rows.item(i).desc,
                         results.rows.item(i).image);

       }
     
     }
     console.log(output);
    resolve(output);
   },(error) =>{
     reject(error);
   })
   

 })
   .catch(e => console.error(e));
    })

  }

display_item_details(id){
    return new Promise((resolve,reject) => {
      this.sqlite.create({
        name: 'test.db',
        location: 'default'
      })
      .then((db: SQLiteObject) => {
          let output = [];
          let query = 'SELECT * FROM ITEM_LIST ' + 
                      'WHERE ID = ?;'
          db.executeSql(query,[id])
          .then((results) => {

             if (results.rows.length > 0) {
                for (var i = 0; i < results.rows.length; i++) {
          
          
          output.push(results.rows.item(i).id, 
                         results.rows.item(i).name,
                         results.rows.item(i).quantity,
                         results.rows.item(i).uom,
                         results.rows.item(i).remark,
                         results.rows.item(i).image);

       }
       console.log(output);
       
     }
     resolve(output);
   },(error) =>{
     reject(error);
   })
   

 })
   .catch(e => console.error(e));
    })
}

update_details(id,name,qty,uom,remark,image){
  return new Promise((resolve,reject) => {
      this.sqlite.create({
        name: 'test.db',
        location: 'default'
      })
      .then((db: SQLiteObject) => {
          let query = 'UPDATE ITEM_LIST ' + 
                      'SET NAME = ?, QUANTITY = ?, UOM = ?, REMARK = ?, IMAGE = ? ' +
                      'WHERE ID = ?;';
          db.executeSql(query,[name,qty,uom,remark,image,id])
          .then((data) => {
            resolve(data);
          },(err) => reject(err))
   

 })
   .catch(e => console.error(e));
})
}

delete_details(id){
  return new Promise((resolve,reject) => {
      this.sqlite.create({
        name: 'test.db',
        location: 'default'
      })
      .then((db: SQLiteObject) => {
          let query = 'DELETE FROM ITEM_LIST ' + 
                      'WHERE ID = ?;';
          db.executeSql(query,[id])
          .then((data) => {
            resolve(data)
          },(err)=>reject(err))
          
 })
   .catch(e => console.error(e));
})
}


search_item_list(val){


let filter = val.toLowerCase();

    return new Promise((resolve,reject) => {
      this.sqlite.create({
        name: 'test.db',
        location: 'default'
      })
      .then((db: SQLiteObject) => {

          let output = [];
          let query = 'SELECT ITEM_LIST.NAME, ITEM_LIST.QUANTITY,ITEM_LIST.ID, ITEM_LIST.IMAGE, UOM_LIST.DESC FROM ITEM_LIST ' + 
                      'INNER JOIN UOM_LIST ON UOM_LIST.ID=ITEM_LIST.UOM;';
          db.executeSql(query,[])
          .then((results) => {


             if (results.rows.length > 0) {
                for (var i = 0; i < results.rows.length; i++) {

                  let item_name = results.rows.item(i).name;

                  if (item_name.toLowerCase().indexOf(filter) > -1){
                    output[i] = [];
                    output[i].push(results.rows.item(i).id, 
                                   results.rows.item(i).name,
                                   results.rows.item(i).quantity,
                                   results.rows.item(i).desc,
                                   results.rows.item(i).image);

                   }
                 }
                   
                   

       }
     
     
   resolve(output);
   console.log(output);
   },(error) =>{
     reject(error)
   })
   

 })
   .catch(e => console.error(e));

})
}

count_item(){
  return new Promise((resolve,reject) => {
      this.sqlite.create({
        name: 'test.db',
        location: 'default'
      })
      .then((db: SQLiteObject) => {
          let query = 'SELECT COUNT (ID) AS cnt FROM ITEM_LIST;';
          db.executeSql(query,[])
          .then((result) => {
            resolve(result.rows.item(0).cnt);
            
          },(err) => reject(err))
   

 })
   .catch(e => console.error(e));
})
}
}
