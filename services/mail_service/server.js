// Dependencies
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

// Controller
const mailController = require('./mail.controller')
const config = require('./_config');

const app = express();

app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Allow cross-origin resource sharing
app.use(cors());

// Setting a port to server to listen on
var port = process.env.PORT || 9006;

// Connecting to remote MongoDB instance
mongoose.connect(config.mongoURI[app.settings.env],function(){

    console.log('Connected to MongoDB : ' + app.settings.env);

}, function(err) {
    throw new Error(err);
});

app.listen(port, function (err) {

    if (err) {
        throw new Error(err);
    } else {
        console.log("Server is listening on " + port);
    }
});

// Routes
app.get('/mails', mailController.getAllMails);
app.put('/mails/:mailId', mailController.updateType);
app.post('/mails', mailController.sendMail);
