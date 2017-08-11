const express = require('express');
const router = express.Router();

router.get('/', (request, response) => {
  const name = request.cookies.username
  if ( name ) {
    response.render('index', { name })
  } else {
  response.redirect('/hello');
  }
});


router.get('/hello', (request, response) => {
  const name = request.cookies.username

  if ( name ) {
    response.redirect('/')
  } else {
    response.render('hello')
  }
})

router.post('/hello', (request, response) => {
  response.cookie('username', request.body.username)
  response.redirect('/')
})

router.post('/goodbye', (request, response) => {
  console.log( '<3333333 oh Hai <3333333' ); 
  response.clearCookie('username')
  response.redirect('/')
})


module.exports = router;