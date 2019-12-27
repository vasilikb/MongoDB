const express = require('express') 
const logger = require('morgan')
const errorhandler = require('errorhandler')
const mongodb= require('mongodb').MongoClient
const bodyParser = require('body-parser')
const json = require('json');


const url = 'mongodb://localhost:27017/FirstMongo'

let app = express()
//app.use(logger('dev'))
//app.use(bodyParser.json())

mongodb.connect(url, (error, db) => {

    if (error) return res.send("BAD");

    var myobj = { name: "Company Inc", address: "Highway 37" };
    var collection = db.collection('Collection 1');
    collection.insert(myobj, (err, res) => {
        if (err) throw err;
        console.log("1 document inserted");
        db.close();
    });
})

  
