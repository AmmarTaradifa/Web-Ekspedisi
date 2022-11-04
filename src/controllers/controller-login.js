const config = require('../configs/database');
let mysql      = require('mysql');
let pool       = mysql.createPool(config);

pool.on('error',(err)=> {
    console.error(err);
});

module.exports ={
    login(req,res){
        res.render("login",{
            url : 'http://localhost:8000/',
            statusFlash: req.flash('status'),
            pesanFlash: req.flash('message'),
        });
    },
    loginCabang(req,res){
        res.render("login-cabang",{
            url : 'http://localhost:8000/',
            statusFlash: req.flash('status'),
            pesanFlash: req.flash('message'),
        });
    },
    // Post / kirim data yang diinput user
    loginAuth(req,res){
        let email = req.body.email;
        let password = req.body.pass;
        if (email && password) {
            pool.getConnection(function(err, connection) {
                if (err) throw err;
                let sql = "SELECT * FROM table_admin WHERE admin_email = ? AND admin_password = SHA2(?,512) AND role ='super' ";
                connection.query(sql, [email, password],function (error, results) {
                    if (error) throw error;  

                    if (results.length > 0) {
                        // Jika data ditemukan, set sesi user tersebut menjadi true
                        req.session.loggedin = true;
                        req.session.userid = results[0].admin_id;
                        req.session.username = results[0].admin_name;
                        res.redirect('/');
                    } 
                    else  {
                        // Jika data tidak ditemukan, set library flash dengan pesan error yang diinginkan
                        req.flash('message', 'Akun tidak ditemukan');
                        res.redirect('/login');
                    }
                });
                connection.release();
            })
        } else {
            res.redirect('/login');
            res.end();
        }
    },

    loginAuthCabang(req,res){
        let email = req.body.email;
        let password = req.body.pass;
        if (email && password) {
            pool.getConnection(function(err, connection) {
                if (err) throw err;
                let sql = "SELECT * FROM table_admin WHERE admin_email = ? AND admin_password = SHA2(?,512) AND role ='cabang' ";
                connection.query(sql, [email, password],function (error, results) {
                    if (error) throw error;  

                    if (results.length > 0) {
                        // Jika data ditemukan, set sesi user tersebut menjadi true
                        req.session.loggedin = true;
                        req.session.userid = results[0].admin_id;
                        req.session.username = results[0].admin_name;
                        res.redirect('/home-cabang');
                    } 

                    else  {
                        // Jika data tidak ditemukan, set library flash dengan pesan error yang diinginkan
                        req.flash('message', 'Akun tidak ditemukan');
                        res.redirect('/login-cabang');
                    }
                });
                connection.release();
            })
        } else {
            res.redirect('/login');
            res.end();
        }
    },

    logout(req,res){
        // Hapus sesi user dari broser
        req.session.destroy((err) => {
            if(err) {
                return console.log(err);
            }
            // Hapus cokie yang masih tertinggal
            res.clearCookie('secretname');
            res.redirect('/login');
        });
    },
}