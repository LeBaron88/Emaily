const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');

const keys = require('./config/keys');
require('./models/User');
require('./services/passport');

mongoose.connect(keys.mongoURI);
const app = express();
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);

app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT);

//dbprod user: dbEmaily-prod
// password qOIEtKTBl09Ov8B9

// mongodb+srv://dbEmaily-prod:qOIEtKTBl09Ov8B9@emaily-prod-1rcjy.mongodb.net/test?retryWrites=true&w=majority

//ClientId 1059653778285-3cqhqhcpcpsch2ppsl30jhfb6lv34qlb.apps.googleusercontent.com
// Secret NRMjwz4dROlQRk7NIjafHc-e
