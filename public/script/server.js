const ow = require('overwatch-stats-api');
const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
var bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({extended: false});
const MongoClient = require("mongodb").MongoClient;
const mongoClient = new MongoClient("mongodb://localhost:27017/", { useNewUrlParser: true, useUnifiedTopology: true });

const views = path.join(__dirname, '../views');
const numOfMembers = 11;
var db, collection;
const  icons = {
    tank: 'https://static.playoverwatch.com/img/pages/career/icon-tank-8a52daaf01.png',
    damage: 'https://static.playoverwatch.com/img/pages/career/icon-offense-6267addd52.png',
    support: 'https://static.playoverwatch.com/img/pages/career/icon-support-46311a4210.png'
}

mongoClient.connect(function(err, client){
    if(err) return console.log(err);
    db = client.db("teamMembers");
    collection = db.collection("members");
});

app.listen(8080, '26.39.123.131');
app.use(bodyParser.json({limit: '50mb'}));
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use('/',express.static(path.join(__dirname, '../../')+ 'public'));
app.set('view engine', 'ejs');
app.enable('trust proxy');

app.get('/', function(request, responce) {
    var ip = request.headers['x-forwarded-for'] || request.connection.remoteAddress;
    responce.status(200).sendFile(path.join(__dirname, "../") + 'html/index.html');
    console.log(`${ip} - main page`);
});

app.get('/team', function(request, responce){
    var ip = request.headers['x-forwarded-for'] || request.connection.remoteAddress;
    console.log(`${ip} - team page`);
    let result = {
        data: []
    };
    let i = 0;
    collection.find().toArray((err, results)=>{
        results.forEach(function(elem) {
            ow.getBasicInfo(elem.battletag.replace('#','-'), 'pc')
                .then(res => {result.data.push(res); i++;}, (err) => {i++;})
                .then(() => {if (i==numOfMembers) responce.render(views+'/team', result);});
        });
    });
});

app.get('/team/:tag', function(request, responce){
    let member = request.params.tag;
    var ip = request.headers['x-forwarded-for'] || request.connection.remoteAddress;
    if (member === 'json'){
        console.log(`${ip} - team json`);
        let result = {
            data: []
        };
        let i = 0;
        collection.find().toArray((err, results)=>{
            results.forEach(function(elem) {
                ow.getBasicInfo(elem.battletag.replace('#','-'), 'pc')
                    .then(res => {result.data.push(res); i++;}, (err) => {i++;})
                    .then(() => {if (i==numOfMembers) responce.json(result);});
            });
        });
        return;
    }
    console.log(`${ip} - team member ${member}`);
    let gainedData = null;
    collection.find({nick: member}).toArray((err, results) => {
        gainedData = results[0];
        (async() => {
            var data = await ow.getAllStats(gainedData.battletag.replace('#','-'),'pc');
            gainedData['data'] = data;
            if (!gainedData.data.rank[gainedData.role]){
                gainedData.data.rank[gainedData.role] = {};
                gainedData.data.rank[gainedData.role].roleIcon = icons[gainedData.role];
            }
            return gainedData;
        })().then(() => responce.render(views+'/member', gainedData))
            .catch((err)=> {console.log(err); responce.sendStatus(500);});
    });
});

app.get('/team/json/:tag', function(request, responce){
    let member = request.params.tag;
    var ip = request.headers['x-forwarded-for'] || request.connection.remoteAddress;
    console.log(`${ip} - member ${member} json`);
    let gainedData = null;
    collection.find({nick: member}).toArray((err, results) => {
        gainedData = results[0];
        (async() => {
            var data = await ow.getAllStats(gainedData.battletag.replace('#','-'),'pc');
            gainedData['data'] = data;
            if (!gainedData.data.rank[gainedData.role]){
                gainedData.data.rank[gainedData.role] = {};
                gainedData.data.rank[gainedData.role].roleIcon = icons[gainedData.role];
            }
            return gainedData;
        })().then(() => responce.json(gainedData));
    });
});

app.get('/contacts', function(request, responce){
    var ip = request.headers['x-forwarded-for'] || request.connection.remoteAddress;
    console.log(`${ip} - contacts page`);
    responce.status(200).sendFile(path.join(__dirname, "../") + 'html/contacts.html');
});
