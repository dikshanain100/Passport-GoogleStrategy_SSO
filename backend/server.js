const express = require('express');
const session = require('express-session');
const passport = require('passport');
const cors = require("cors");
require('./passport/auth');

const app = express();

// app.use(
//   cors({
//     origin: ["http://localhost:4200"],
//     credentials: true
//   }));


app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});

function isLoggedIn(req, res, next) {
  console.log('inside is logged in ')
  req.user ? next() : res.sendStatus(401);
}

app.use(session({ secret: 'cats', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res, next) => {
  res.send('<a href="/auth/google">Authenticate with Google</a>');
});

app.get('/auth/google',
  passport.authenticate('google', { scope: ['email', 'profile'] }
  ));


/* Required when calling route from UI, check 'main' comp for same
* Getting CORS error here, to resolve it, app domain should be added in google credentials domain
*/
// app.get('/ssoLogin', (req, res, next) => {
//   authLogin(req, res, next);
// });


// function authLogin(req, res, next) {
//   console.log('ghh')
//   passport.authenticate('google', { scope: ['email', 'profile'] }, function (err, user, info) {
//     console.log('opp')
//   })(req, res, next);
// }



app.get('/auth/google/callback',
  passport.authenticate('google', {
    successRedirect: '/successfulLogin',
    //successRedirect: 'http://localhost:4200/landing', //this will work as well
    failureRedirect: '/auth/google/failure'
  })
);



app.get('/successfulLogin', isLoggedIn, (req, res) => {
  // res.send(`Hello ${req.user.displayName}`);
  console.log('session id inside successfulLogin :: ', req.session.id);
  res.writeHead(301, {
    location: "http://localhost:4200/landing",
  });
  res.end();

  // will work if req is send from frontend instead of laoding backend url directly
  // res.status(200).send({
  //   message: true, //successful login
  // })


});


const accountBalances = {
  'dikshanain10@gmail.com': 53762,
  'max@gmail.com': 4826
};
const getBalance = (email) => {
  return accountBalances[email];
};



app.get('/balance', isLoggedIn, (req, res) => {
  //const user = req.session.user; Not required, as will fetch value from passport session
  console.log('session id inside balance :: ', req.session.id);
  console.log('req.session.passport.user.email :: ', req.session.passport.user.email);
  const balance = getBalance(req.session.passport.user.email);
  if (balance) {
    res.status(200).send({
      balance: balance
    })
  } else {
    res.status(403).send({
      errorMessage: 'Access Denied.'
    });
  }
});



app.get('/logout', (req, res) => {
  req.logout();
  // req.session.destroy();
  res.send('Goodbye!');
});

app.get('/auth/google/failure', (req, res) => {
  // res.send('Failed to authenticate..');

  res.status(200).send({
    message: false, //unsuccessful login
  })


});

app.listen(8080, () => console.log('listening on port: 8080'));