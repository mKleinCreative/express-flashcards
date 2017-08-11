const express = require('express');
const router = express.Router();
const { data } = require('../data/flashcardData.json');
const { cards } = data;

router.get('/', ( request, response ) => {
  const numberOfCards = cards.length;
  const flashcardId = Math.floor( Math.random() * numberOfCards );
  response.redirect( `/cards/${flashcardId}` )
})

router.get('/:id', (request, response) => {
  const { side } = request.query;
  const { id } = request.params;
  
  const name = request.cookies.username
  
  if ( !side ) {
    response.redirect(`/cards/${id}?side=question`)
  }
  
  const text = cards[id][side];
  const { hint } = cards[id];

  const templateData = { id, text, name }

  if ( side === 'question' ) {
    templateData.hint = hint;
    templateData.sideToShow = 'answer'
    templateData.sideToShowDisplay = 'Answer'
  } else if ( side === 'answer' ) {
    templateData.sideToShow = 'question'
    templateData.sideToShowDisplay = 'Question'
  }
  
  response.render('card', templateData );
});

module.exports = router;