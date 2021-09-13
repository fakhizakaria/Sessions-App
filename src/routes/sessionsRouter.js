const express = require('express');
const debug = require('debug')('app:sessionsRouter');
const {MongoClient, ObjectId} = require('mongodb');
const sessionsRouter = express.Router();
const sessionsData = require('../data/sessions.json');


sessionsRouter.route('/').get((req, res) => {
    const url ='mongodb+srv://fzakaria:fzakaria@cluster0.8xnua.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
    const dbName = 'Fzakaria';
  
    (async function mongo() {
      let client;
      try {
        client = await MongoClient.connect(url);
        debug('Connected to the mongo DB');
        const db = client.db(dbName);
        const sessions = await db.collection('sessions').find().toArray();
        res.render('sessions', { sessions });
      } catch (error) {
        debug(error.stack);
      }
      client.close();
    })();
  });
  

  sessionsRouter.route('/:id').get((req, res) => {
    const id = req.params.id;
    const url ='mongodb+srv://fzakaria:fzakaria@cluster0.8xnua.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
    const dbName = 'Fzakaria';
  
    (async function mongo() {
      let client;
      try {
          client = await MongoClient.connect(url);
          debug('Connected to the mongo DB');
          const db = client.db(dbName);
          let session;

          session = await db
            .collection('sessions')
            .findOne({ _id: new ObjectId(id) });

          res.render('session', {
            session,
          });
      } catch (error) {
        debug(error.stack);
      }
      client.close();
    })();
  });

module.exports = sessionsRouter;