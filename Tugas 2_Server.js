const express = require('express');
const bodyparser = require('body-parser');
const fs = require('fs');
const mysql = require('mysql');
const app = express();

app.use(bodyparser.json());
const {json} = require('body-parser');

const conn = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : '',
    database : 'votesystem'
});

conn.connect(function(err){
    if (err) throw err;
    console.log("MySQL connected......")
});

app.get('/candidates', function(req, res) {
    console.log('Menerima GET request /candidates');
    let sql = "SELECT id, firstname FROM candidates";
    let query = conn.query(sql, function(err, result){
        if (err) throw err;
        res.send(JSON.stringify({
            "status" : 200,
            "error" : null,
            "response" : result
        }));
    });
});

app.post('/tambahcandidates', function(req,res){
    console.log('POST request /tambahcandidates');
    let genre = {genre: req.body.genre};
    json.getString
    let namacalon = {namacalon: req.body.namacalon};
    let email = {mail: req.body.email};
    let password = {pass: req.body.password};
    let check = "SELECT genre FROM candidates WHERE genre ='"+genre.genre+"'";

    let checker = conn.query(check, (err, checkresult)=>{
        console.log(JSON.stringify(
            {
                "status" : 200,
                "error" : null,
                "response" : checkresult
            }
        ));
        console.log(checkresult);
        if (checkresult == ""){
            let sql = "INSERT INTO candidates (genre, namacalon, email, password ) VALUES ('"
                      +genre.genre+"','"+namacalon.namacalon+"','"+email.mail+"','"+password.pass+"')";
            let query = conn.query(sql, (err, result) =>{
                console.log(JSON.stringify(
                    {
                        "status" : 200,
                        "error" : null,
                        "response" : result
                    }
                ));
                conn.query(check, (err, checkresult) => {
                    console.log(JSON.stringify(
                        {
                            "status" : 200,
                            "error" : null,
                            "response" : checkresult
                        }
                    ));
                });
                res.send("Penambahan Berhasil")
            });
        }
        else {
            res.send("Penambahan Gagal")
        }
    })
})

app.post('/registervoters', function(req,res){
    console.log('POST request /registervoters');
    let voters = {voters: req.body.voters};
    json.getString
    let email = {mail: req.body.email};
    let password = {pass: req.body.password};
    let check = "SELECT idvoters FROM voters WHERE voters ='"+voters.voters+"'";

    let checker = conn.query(check, (err, checkresult)=>{
        console.log(JSON.stringify(
            {
                "status" : 200,
                "error" : null,
                "response" : checkresult
            }
        ));
        console.log(checkresult);
        if (checkresult == ""){
            let sql = "INSERT INTO voters (voters, password, email) VALUES ('"+voters.voters+"','"+password.pass+"','"+email.mail+"')";
            let query = conn.query(sql, (err, result) =>{
                console.log(JSON.stringify(
                    {
                        "status" : 200,
                        "error" : null,
                        "response" : result
                    }
                ));
                conn.query(check, (err, checkresult) => {
                    console.log(JSON.stringify(
                        {
                            "status" : 200,
                            "error" : null,
                            "response" : checkresult
                        }
                    ));
                });
                res.send("Register Berhasil")
            });
        }
        else {
            res.send("Register Gagal")
        }
    })
})

app.post('/voters', function(req,res){
    console.log("POST request /voters");
    let voters = {voters: req.body.voters};
    json.getString    
    let password = {pass: req.body.password};
    let sql = "SELECT voters_id, password FROM voters WHERE voters='"+voters.voters+"' AND password = '"+password.pass+"'";
    console.log(sql)
    let query = conn.query(sql, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).json({ status: 500, error: 'Internal Server Error', response: null });
          } else {
            if (result.length > 0) {
              res.status(200).json({ status: 200, error: null, response: 'Login Berhasil' });
            } else {
              res.status(401).json({ status: 401, error: 'Unauthorized', response: 'Login Gagal' });
            }
          }
        });
      });

app.post('/admin', function(req,res){
    console.log("POST request /admin");
    let admin = {admin: req.body.admin};
    json.getString    
    let password = {pass: req.body.password};
    let sql = "SELECT idadmin, admin FROM admin WHERE admin='"+admin.admin+"' AND password = '"+password.pass+"'";
    console.log(sql)
    let query = conn.query(sql, (err, result) => {
        console.log(JSON.stringify(
            {"status" : 200, "error" : null, "response" : result}
        ));
        if(result != "") {
            res.send("Login Berhasil")
        }
        else {
            res.send("Login Gagal")}
    });
});

app.get('/votes', function(req, res) {
    console.log('Menerima GET request /votes');
    let sql = "SELECT * FROM voters";
    let query = conn.query(sql, function(err, result){
        if (err) throw err;
        res.send(JSON.stringify({
            "status" : 200,
            "error" : null,
            "response" : result
        }));
    });
});

app.get('/admin', function(req, res) {
    console.log('Menerima GET request /admin');
    let sql = "SELECT * FROM pesan";
    let query = conn.query(sql, function(err, result){
        if (err) throw err;
        res.send(JSON.stringify({
            "status" : 200,
            "error" : null,
            "response" : result
        }));
    });
});

app.post('/pesan', function(req,res) {
    console.log('POST request /pesan');
    let namalengkap = {namalengkap: req.body.namalengkap};
    json.getString
    let email = {mail: req.body.email};
    let nomorhp = {nomor: req.body.nomorhp};
    let namacalon = {namacalon: req.body.namacalon};
    let check = "SELECT namalengkap FROM pesan WHERE namalengkap ='"+namalengkap.namalengkap+"'";

    let checker = conn.query(check, (err, checkresult)=>{
        console.log(JSON.stringify(
            {
                "status" : 200,
                "error" : null,
                "response" : checkresult
            }
        ));
        console.log(checkresult);
        if (checkresult == ""){
            let sql = "INSERT INTO pesan (namalengkap, email, nomorhp, nama konser) VALUES ('"
                      +namalengkap.namalengkap+"','"+email.mail+"','"+nomorhp.nomor+"','"+namacalon.namacalon+"')";
            let query = conn.query(sql, (err, result) =>{
                console.log(JSON.stringify(
                    {
                        "status" : 200,
                        "error" : null,
                        "response" : result
                    }
                ));
                conn.query(check, (err, checkresult) => {
                    console.log(JSON.stringify(
                        {
                            "status" : 200,
                            "error" : null,
                            "response" : checkresult
                        }
                    ));
                });
                res.send("Data Masuk, ID tiket anda="+result.insertId)
            });
        }
        else {
            res.send("Data Tidak Masuk")
        }
    })
})


app.listen(7000);
console.log('server berjalan di port 7000')