const config = require('../configs/database');
const mysql = require('mysql');
const pool = mysql.createPool(config);
const async = require('async');

pool.on('error',(err)=> {
    console.error(err);
});

module.exports ={
    // getDataOrder(req,res){
    //   let sql = "SELECT id_order,tabel_user.nama_user AS nama_user,tabel_user.nama_user AS list_user, table_admin.admin_name AS nama_admin, tabel_ongkir.tujuan AS tujuan, nama_barang, berat,total_harga,status FROM  tabel_order JOIN tabel_user ON tabel_order.id_user = tabel_user.id_user JOIN table_admin ON tabel_order.admin_id = table_admin.admin_id JOIN tabel_ongkir ON tabel_order.id_ongkir = tabel_ongkir.id_ongkir";

    //   let query = pool.query(sql,(err, results) => {
    //     if(err) throw err;
    //        res.render('order-cabang',{dataOrder: results} );
    //   });

    //   // let sql2 = "SELECT * FROM tabel_user";
    //   //   let query2 = pool.query(sql2, (err, results) => {
    //   //     if(err) throw err;
    //   //        res.redirect({dataUser: results});
    //   // });
    // },


    getDataOrder(req,res){
      async.parallel([
        function(callback){
          let sql = "SELECT id_order,tabel_user.nama_user AS nama_user,tabel_user.nama_user AS list_user, table_admin.admin_name AS nama_admin, tabel_ongkir.tujuan AS tujuan, nama_barang, berat,total_harga,status,resi FROM  tabel_order JOIN tabel_user ON tabel_order.id_user = tabel_user.id_user JOIN table_admin ON tabel_order.admin_id = table_admin.admin_id JOIN tabel_ongkir ON tabel_order.id_ongkir = tabel_ongkir.id_ongkir ORDER BY id_order";
          let query = pool.query(sql, (err, results1) => {
            if (err) {
              return callback(err);
            }
            return callback(null, results1);
          });
        },function(callback){
          let sql = "SELECT * FROM tabel_user";
          let query = pool.query(sql, (err, results2) => {
            if (err) {
              return callback(err);
            }
            return callback(null, results2);
          });
        },function(callback){
          let sql = "SELECT * FROM table_admin WHERE role = 'cabang' ";
          let query = pool.query(sql, (err, results3) => {
            if (err) {
              return callback(err);
            }
            return callback(null, results3);
          });
        },function(callback){
          let sql = "SELECT * FROM tabel_ongkir";
          let query = pool.query(sql, (err, results4) => {
            if (err) {
              return callback(err);
            }
            return callback(null, results4);
          });
        }
      ], function(error,callbackResults){
        if(error){
          console.log(error);
        }else{
          res.render('order-cabang',{
            listOrder:callbackResults[0],
            listUser:callbackResults[1],
            listAdmin: callbackResults[2],
            listOngkir: callbackResults[3],
          });
        }
      });
    },

    getDataOrderBySuper(req,res){
      let sql = "SELECT id_order,tabel_user.nama_user AS nama_user, table_admin.admin_name AS nama_admin, tabel_ongkir.tujuan AS tujuan, nama_barang, berat,total_harga,status FROM  tabel_order JOIN tabel_user ON tabel_order.id_user = tabel_user.id_user JOIN table_admin ON tabel_order.admin_id = table_admin.admin_id JOIN tabel_ongkir ON tabel_order.id_ongkir = tabel_ongkir.id_ongkir ORDER BY id_order";
      let query = pool.query(sql, (err, results) => {
        if(err) throw err;
           res.render('order',{dataOrder: results});
        // return console.log(query);
      
    });
   },

    

    // Simpan data order
    addDataOrder(req,res){
      let currentResi = (Math.random() + 1).toString(36).substring(7);
      console.log("random", currentResi);
        let data = {
          id_user: req.body.nama_user, 
          admin_id: req.body.nama_admin, 
          id_ongkir: req.body.tujuan, 
          nama_barang: req.body.nama_barang,  
          berat: req.body.berat, 
          total_harga: req.body.berat * 10000, 
          status: 'penyortiran', 
          resi: currentResi,
        };
            let sql = "INSERT INTO tabel_order SET ?";
            let query = pool.query(sql, data,(err, results) => {
              if(err) throw err;
              // console.log(query);
             res.redirect('/order-cabang');
         });
    },
    // Update data order
    editDataOrder(req,res){
        let sql = "UPDATE tabel_order SET id_order='"+req.body.id_order+"', id_user='"+req.body.nama_user+"',admin_id='"+req.body.nama_admin+"',id_ongkir='"+req.body.tujuan+"',nama_barang='"+req.body.nama_barang+"',berat='"+req.body.berat+"',total_harga='"+req.body.berat * 10000 +"',status='"+req.body.status+"' WHERE id_order="+req.body.id_order;
         let query = pool.query(sql, (err, results) => {
          if(err) throw err;
          res.redirect('/order-cabang');
    });
    },
    // Delete data order
    deleteDataOrder(req,res){
    let sql = "DELETE FROM tabel_order WHERE id_order="+req.body.id_order+"";
    let query = pool.query(sql, (err, results) => {
    if(err) throw err;
      res.redirect('/order-cabang');
  });
    }
}