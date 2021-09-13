const express = require('express');
const debug = require('debug')('app:adminRouter');
const {MongoClient} = require('mongodb');
const sessionsData = require('../data/sessions.json');

const adminRouter = express.Router();

adminRouter.route('/').get((req, res) => {
    const url ='mongodb+srv://fzakaria:fzakaria@cluster0.8xnua.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
    const dbName = 'Fzakaria';
    
    (async function mongo() {
        let client;
        try {
            client = await MongoClient.connect(url);
            debug('Connected to the mongo DB');
            const db = client.db(dbName);
            let response;
            response = await db.collection('sessions').insertMany(sessionsData);
            res.json(response);
        } catch (error) {
            debug(error.stack)
        }
        client.close();
    } ());
})

module.exports = adminRouter;