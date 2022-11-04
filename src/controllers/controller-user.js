const config = require('../configs/database');
const mysql = require('mysql');
const pool = mysql.createPool(config);

pool.on('error',(err)=> {
    console.error(err);
});

module.exports ={
    getDataUser(req,res){
        let sql = "SELECT * FROM tabel_user";
        let query = pool.query(sql, (err, results) => {
          if(err) throw err;
             res.render('user-cabang',{dataUser: results});
      });
    },

    getDataUserBySuper(req,res){
      let sql = "SELECT * FROM tabel_user";
      let query = pool.query(sql, (err, results) => {
        if(err) throw err;
           res.render('user',{dataUser: results});
    });
  },

    addDataUser(req,res){
        let data = {nama_user: req.body.nama_user, alamat: req.body.alamat, tujuan: req.body.tujuan};
            let sql = "INSERT INTO tabel_user SET ?";
            let query = pool.query(sql, data,(err, results) => {
              if(err) throw err;
             res.redirect('/user-cabang');
         });
    },
    editDataUser(req,res){
        let sql = "UPDATE tabel_user SET nama_user='"+req.body.nama_user+"', alamat='"+req.body.alamat+"', tujuan='"+req.body.tujuan+"' WHERE id_user="+req.body.id_user;
         let query = pool.query(sql, (err, results) => {
          if(err) throw err;
          res.redirect('/user-cabang');
    });
    },
    deleteDataUser(req,res){
    let sql = "DELETE FROM tabel_user WHERE id_user="+req.body.id_user+"";
    let query = pool.query(sql, (err, results) => {
    if(err) throw err;
      res.redirect('/user-cabang');
    });
    },

    editDataUserBySuper(req,res){
      let sql = "UPDATE tabel_user SET nama_user='"+req.body.nama_user+"', alamat='"+req.body.alamat+"', tujuan='"+req.body.tujuan+"' WHERE id_user="+req.body.id_user;
       let query = pool.query(sql, (err, results) => {
        if(err) throw err;
        res.redirect('/user');
     });
    },
    deleteDataUserBySuper(req,res){
    let sql = "DELETE FROM tabel_user WHERE id_user="+req.body.id_user+"";
    let query = pool.query(sql, (err, results) => {
    if(err) throw err;
      res.redirect('/user');
    });
   }
}