const MongoClient = require("mongodb").MongoClient;
const ow = require('overwatch-stats-api');
const path = require('path');
const fs = require('fs');

let users = [{name: 'Dina Safina', age: '23', location: 'Moscow, Russia', battletag:'Doza#21708', nick:'Doza', role:'support', headshot:'https://sun9-56.userapi.com/c852220/v852220388/1c3ab3/ZzOOp-J4ajY.jpg'},
             {name: 'Roman Dmitriev', age: '17', location: 'Moscow, Russia', battletag:'Rodizzz#2712', nick:'Rodizzz', role:'support', headshot:'https://image.flaticon.com/icons/png/512/57/57134.png'},
             {name: 'Anton Gamagin', age: '18', location: 'Moscow, Russia', battletag:'ШаманКинг#21611', nick:'ШаманКинг', role:'support', headshot:'https://sun9-30.userapi.com/c857420/v857420209/611a9/i7FLIhk8oAg.jpg'},
             {name: 'Maria Stepanova', age: '21', location: 'Moscow, Russia', battletag:'Ashaat#2798', nick:'Ashaat', role:'support', headshot:'https://sun9-41.userapi.com/c852220/v852220388/1c3aa5/guZ5SgNMM-w.jpg'},
             {name: 'Gurin Semyon', age: '20', location: 'Moscow, Russia', battletag:'КОПАТЫЧ#21284', nick:'КОПАТЫЧ', role:'tank', headshot:'https://sun9-8.userapi.com/c852220/v852220388/1c3aba/_3adH2fNhsM.jpg'},
             {name: 'Danila Kurnev', age: '21', location: 'St. Petersburg, Russia', battletag:'Danon#21419', nick:'Danon', role:'tank', headshot:'https://image.flaticon.com/icons/png/512/57/57134.png'},
             {name: 'Sergei Pushnoy', age: '21', location: 'Moscow, Russia', battletag:'MrPonchikk#2422', nick:'MrPonchikk', role:'tank', headshot:'https://image.flaticon.com/icons/png/512/57/57134.png'},
             {name: 'Mikhail Stepanishchevsky', age: '19', location: 'Moscow, Russia', battletag:'Cy4n#21493', nick:'Cy4n', role:'tank', headshot:'https://image.flaticon.com/icons/png/512/57/57134.png'},
             {name: 'Alexander Pershin', age: '26', location: 'Yakutsk, Russia', battletag:'Sorry#21341', nick:'Sorry', role:'damage', headshot:'https://image.flaticon.com/icons/png/512/57/57134.png'},
             {name: 'Denis Nadtoka', age: '19', location: 'Kharkiv, Ukraine', battletag:'SuicideDog#2592', nick:'SuicideDog', role:'damage', headshot:'https://sun9-40.userapi.com/c850328/v850328193/1dd437/Mq3E8p3UqGs.jpg'},
             {name: 'Artyom Astakhov', age: '21', location: 'Moscow, Russia', battletag:'Cataboom#21854', nick:'Cataboom', role:'damage', headshot:'https://sun9-10.userapi.com/c852220/v852220388/1c3aac/ecFI4OW_M9k.jpg'}
];

// создаем объект MongoClient и передаем ему строку подключения
const mongoClient = new MongoClient("mongodb://localhost:27017/", { useNewUrlParser: true, useUnifiedTopology: true });
mongoClient.connect(function(err, client){

    if(err){
        return console.log(err);
    }

    const db = client.db("teamMembers");
    const collection = db.collection("members");

    collection.insertMany(users, (err,results)=>{if(!err)console.log("stored");})

    //collection.drop(function(err, result){ console.log('Data has been deleted successfully'); });

    client.close();
});
