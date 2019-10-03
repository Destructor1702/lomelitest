let express = require('express');
let app = express();
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');


class DB{
    constructor(){
        const adapter = new FileSync('db.json');
        this.db = low(adapter);
        this.db.defaults({  //admin admin
            users:[{name: "admin", pass:"8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918"}],
            tokens: []
        })
        .write();
        console.log("database connection is jalando")
    }
    addUser(name, pass){
        let id = this.db.get('users').size().value();
        this.db.get('users')
        .push({id, name, pass})
        .write()
    }
    getUsers(id=undefined){
        return id
        ? this.db.get('users').find({ id: id }).value()
        : this.db.get('users').value()
    }
    updateUserName(id,newName){
        this.db.get('users')
        .find({ id: id })
        .assign({ title: newName})
        .write()
    }
    updateUserPass(id,hash){
        this.db.get('users')
        .find({ id: id })
        .assign({ pass: hash})
        .write()
    }
    removeUser(id){
        //not a good practice
        this.db.get('users')
        .remove({ id: id })
        .write()
    }
    assertLogin(name, hash){
        if (this.db.get('users').find({ name, pass: hash }).size().value() > 0 ){
            let token = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
            this.db.get('tokens')
            .push(token)
            .write();
            //tokens should be renewed i know... yolo
            return token
        }
        return null;
    }
    isValidToken(token){
       return this.db.get('tokens').find(token).size().value() > 0
    }
    removeToken(token){
        this.db.get('tokens')
        .remove(token)
        .write();
        return true
    }
    killAllSessions(){
        this.db.get('tokens')
            .remove()
            .write();
    }
};

const database = new DB();

/********** CLEARS ALL SESSIONS EVERY 2 HRS
function clearTokens() {
    var d = new Date(),
        h = new Date(d.getFullYear(), d.getMonth(), d.getDate(), d.getHours() + 2, 0, 0, 0),
        e = h - d;
    if (e > 100) { // some arbitrary time period
        window.setTimeout(clearTokens, e);
    }
    database.killAllSessions()
}
***********/

app.get('/', function(req, res) {
    //TODO serve static compiled Frontend
  res.send("<h3>app here: <a href=\"http://localhost:3000\">front</a></h3>");
  //mas freson
  //res.redirect("http://localhost:3000");

});

app.get('/users', function(req, res) {
    console.log("users invoked with id: ",req.headers.authorization, req.query.id );
    if(!database.isValidToken(req.headers.authorization)){res.status(403).send({errorCode:"not authorized"})}
    const id = req.query.id;
    res.json(database.getUsers(id))
});

app.get('/login', function(req, res) {
    const name = req.body && req.body.name;
    const pass = req.body && req.body.pass;
    console.log("login  invoked with id: ", name, pass);
    res.json(database.assertLogin(name,pass))
});

app.get('/logout', function(req, res) {
    console.log("update invoked with id: ",req.headers.authorization);
    if(!database.isValidToken(req.headers.authorization)){res.status(403).send({errorCode:"not authorized"})}
    res.json(database.removeToken(req.headers.authorization))
});

app.get('/add', function(req, res) {
    console.log("add invoked with : ", req.body, req.headers.authorization);
    if(!database.isValidToken(req.headers.authorization)){res.status(403).send({errorCode:"not authorized"})}
    const name = req.body && req.body.name;
    const pass = req.body && req.body.pass;
    res.json(database.addUser(name, pass))
});

app.get('/remove', function(req, res) {
    console.log("remove ",req.body.id," invoked with id: ",req.headers.authorization);
    if(!database.isValidToken(req.headers.authorization)){res.status(403).send({errorCode:"not authorized"})}
    const id = req.body.id;
    res.json(database.removeUser(id))
});

app.get('/update', function(req, res) {
    console.log("update invoked with id: ",req.headers.authorization,"body ", req.body);
    if(!database.isValidToken(req.headers.authorization)){res.status(403).send({errorCode:"not authorized"})};
    const id = req.body.id;
    const name = req.body && req.body.name;
    const pass = req.body && req.body.pass;
    if(name){database.updateUserName(id,name)}
    if(pass){database.updateUserPass(id,pass)}
    res.json(true)
});



let port = 3000;
console.log("started service at port ",port,"...");
app.listen(port);