const config = require('../configs/database');
let mysql      = require('mysql');
let pool       = mysql.createPool(config);

pool.on('error',(err)=> {
    console.error(err);
});


module.exports ={
    getDataCabang(req,res){
        let sql = "SELECT * FROM table_admin WHERE role= 'cabang'";
        // console.log(sql);
        let query = pool.query(sql, (err, results) => {
          if(err) throw err;
             res.render('cabang',{dataCabang: results});
      });
    },

    addDataCabang(req,res){
        // Tampung inputan user kedalam varibel username, email dan password
        let username = req.body.admin_name;
        let email = req.body.admin_email;
        let password = req.body.admin_password;
        if (username && email && password ) {
            // Panggil koneksi dan eksekusi query
            pool.getConnection(function(err, connection) {
                if (err) throw err;
                connection.query(
                    `INSERT INTO table_admin (admin_name,admin_email,role,admin_password) VALUES (?,?,'cabang',SHA2(?,512));`
                , [username, email, password],function (error, results) {
                    if (error) throw error;
                    res.redirect('/cabang');
                });
                // Koneksi selesai
                connection.release();
            })
        } else {
            // Kondisi apabila variabel username, email dan password tidak terisi
            res.redirect('/cabang');
            res.end();
        }
    },
    editDataCabang(req,res){
        let sql = "UPDATE table_admin SET admin_name='"+req.body.admin_name+"', admin_email='"+req.body.admin_email+"' WHERE admin_id="+req.body.admin_id+"";
         let query = pool.query(sql, (err, results) => {
          if(err) throw err;
          res.redirect('/cabang');
    });
    },
    deleteDataCabang(req,res){
    let sql = "DELETE FROM table_admin WHERE admin_id="+req.body.admin_id+"";
    let query = pool.query(sql, (err, results) => {
    if(err) throw err;
      res.redirect('/cabang');
  });
    }
}