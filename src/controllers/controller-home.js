const config = require('../configs/database');
const mysql = require('mysql');
const pool = mysql.createPool(config);

pool.on('error',(err)=> {
    console.error(err);
});

module.exports ={
    home(req,res){
        res.render("home",{
            url: 'http://localhost:8000/',
            userName: req.session.username,
        });
    },

    homeCabang(req,res){
        res.render("home-cabang",{
            url: 'http://localhost:8000/',
            userName: req.session.username,
        });
    },

    cekResi(req,res){
        res.render("cek-resi",{
            url: 'http://localhost:8000/',
            userName: req.session.username,
        });
    },

    
  cekResiByResi(req, res) {
    // mendeklare query mencari data order berdasarkan nomer resi
    let sql =
      "SELECT id_order,tabel_user.nama_user AS nama_user,tabel_user.nama_user AS list_user, table_admin.admin_name AS nama_admin, tabel_ongkir.tujuan AS tujuan, nama_barang, berat,total_harga,status,resi FROM tabel_order JOIN tabel_user ON tabel_order.id_user = tabel_user.id_user JOIN table_admin ON tabel_order.admin_id = table_admin.admin_id JOIN tabel_ongkir ON tabel_order.id_ongkir = tabel_ongkir.id_ongkir WHERE tabel_order.resi = '" +
      req.params.resi +
      "'";

    // mengambil data dari database
    let query = pool.query(sql, (err, results) => {
      if (err) throw err;
      res.send(results);
    });
  },



}