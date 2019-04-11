const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const passport = require('passport');

const users = require('./routes/api/users');
const post = require('./routes/api/posts');
const profile = require('./routes/api/profile');

const app = express();

// Mongo DB Connection
mongoose.connect('mongodb://localhost/devcon')
    .then(() => console.log('Connected to DB'))
    .catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());

// Passport configs (JWT Startegy)
require('./config/passport')(passport);

// Start Page
app.get('/', (req, res) => {
    res.send("Hello World");
})
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: false
}))

// parse application/json
app.use(bodyParser.json())

// Use Routes
app.use('/api/users', users);
app.use('/api/post', post);
app.use('/api/profile', profile);


// Port Environment
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
});