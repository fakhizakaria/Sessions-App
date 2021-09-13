const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');
const path = require('path');

const PORT = process.env.PORT || 3000 ;
const app = express();

const sessionsRouter = require('./src/routes/sessionsRouter.js');
const adminRouter = require('./src/routes/adminRouter.js');

app.use(morgan('tiny'));
app.use(express.static(path.join(__dirname, '/public/')));

app.use('/sessions', sessionsRouter);
app.use('/admin', adminRouter);


app.set('views', './src/views');
app.set('view engine', 'ejs');

// to run debug on CMD: $env:DEBUG='app' node app.js
app.listen(PORT, () => {
    debug(`listening on port ${chalk.green(PORT)}`);
})

// Simple route to home page
app.get('/', (req, res) => {
    res.render('index', {title: 'Zak EJB', data: ['a', 'b','c']});
})

