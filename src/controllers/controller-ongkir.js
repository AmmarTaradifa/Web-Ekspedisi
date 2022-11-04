const config = require('../configs/database');
const mysql = require('mysql');
const pool = mysql.createPool(config);

pool.on('error',(err)=> {
    console.error(err);
});

module.exports ={
    getDataOngkir(req,res){
        let sql = "SELECT * FROM tabel_ongkir";
        let query = pool.query(sql, (err, results) => {
          if(err) throw err;
             res.render('ongkir',{dataOngkir: results});
      });
    },

    addDataOngkir(req,res){
        let data = {asal: req.body.asal, tujuan: req.body.tujuan, harga: req.body.harga};
            let sql = "INSERT INTO tabel_ongkir SET ?";
            let query = pool.query(sql, data,(err, results) => {
              if(err) throw err;
             res.redirect('/ongkir');
         });
    },
    // Update data ongkir
    editDataOngkir(req,res){
        let sql = "UPDATE tabel_ongkir SET asal='"+req.body.asal+"', tujuan='"+req.body.tujuan+"',harga='"+req.body.harga+"' WHERE id_ongkir="+req.body.id_ongkir;
         let query = pool.query(sql, (err, results) => {
          if(err) throw err;
          res.redirect('/ongkir');
    });
    },
    // Delete data ongkir
    deleteDataOngkir(req,res){
    let sql = "DELETE FROM tabel_ongkir WHERE id_ongkir="+req.body.id_ongkir+"";
    let query = pool.query(sql, (err, results) => {
    if(err) throw err;
      res.redirect('/ongkir');
  });
    }
}