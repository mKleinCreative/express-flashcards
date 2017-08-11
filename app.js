const express = require('express');
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

const app = express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use('/static', express.static('public'))

app.set('view engine', 'pug')

const mainRoutes = require('./routes/index')
const cardRoutes = require('./routes/cards')

app.use( mainRoutes );
app.use('/cards', cardRoutes);

app.use((request, response, next) => {
  const err = new Error('Not found :(');
  err.status = 404;
  next(err)
})

app.use((err, request, response, next) => {
  response.locals.err = err
  response.status(err.status);
  response.render('error', err);
})


app.listen(3000, () => {
  console.log( '<3333333 Running on port 3000 <3333333' ); 
});
