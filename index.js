const express = require('express') 
const logger = require('morgan')
const errorhandler = require('errorhandler')
const mongodb= require('mongodb').MongoClient
const bodyParser = require('body-parser')
const json = require('json');

const url = 'mongodb://localhost:27017/FirstMongo'

let app = express()
app.use(logger('dev'))
app.use(bodyParser.json())

mongodb.connect(url, (error, db) => {

    if (error) return res.send("BAD");
  
    app.get('/', (req, res) => {
        res.send(json.loads(db));
    })

    app.get('/Collection', (req, res, err) => {
      db.collection('Collection 1')
        .find({}, {sort: {_id: -1}})
        .toArray((error, accounts) => {
          if (error) return next(error)
          res.send(accounts)
      })
    })

    app.post('/Collection', (req, res) => {
        let newAccount = req.body
        var myobj = { name: "Company Inc", address: "Highway 37" };
        var collection = db.collection('Collection 1');
        collection.insert(myobj, (err, res) => {
            if (err) throw err;
            console.log("1 document inserted");
            db.close();
        });
    })

    app.put('/Collection/:id', (req, res) => {
        dbo = db.get("FirstMango");
        dbo.collection('Collection 1')
          .update({_id: mongodb.ObjectID(req.params.id)}, 
            {$set: req.body}, 
            (error, results) => {
              if (error) return next(error)
              res.send(results)
            }
          )
    })

    app.delete('/Collection/:id', (req, res) => {
        dbo = db.get("FirstMango");
        dbo.collection('Collection 1')
          .remove({_id: mongodb.ObjectID( req.params.id)}, (error, results) => {
           if (error) return next(error)
           res.send(results)
        })
       })
       
    app.listen(3000)
    console.log("server started");
})

