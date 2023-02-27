const {app} = require('../app');
const session= require('express-session');
const MongoStore = require('connect-mongo');

app.use(session({
    secret: "Voici ma cle secrete",
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        maxAge: 1000 * 60 * 60* 24* 14 // cookie de 14 jours
    },
    store: MongoStore.create({
        mongoUrl: 'mongodb://joakim:toto@127.0.0.1:27017/twitter_dwwm',
        ttl: 60 * 60 * 24 * 14
    })
}))