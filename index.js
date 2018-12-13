/* ******************

 Fixes for Heroku
 See http://stackoverflow.com/a/31094668

 ******************* */

const express = require('express');
const app = express();
const path = require('path');


app.set('port', (process.env.PORT || 5000));


app.get('/', function (request, response) {
    response.sendFile(path.join(__dirname + '/views/index.html'));
}).listen(app.get('port'), function () {
    console.log('App is running, server is listening on port ', app.get('port'));
});


/* ******************

 The Setup

 ******************* */
const T = require('./modules/T');
const Twitter = require('./modules/twitter');

/* ******************

 Key Variables

 ******************* */
const proton = {
    id: 81451848,
    screen_name: 'Bolaji___'
};

console.log(proton);

const bt_bot = {
    id: 1065628267967901696,
    screen_name: 'BackticksTildes'
};

const emojis = ['👊', '👊', '🙌', '👍', '👌', '❣️', '💯', '🔥', '😎'];


/* ******************

 General Functions

 ******************* */
function shouldSendReply() {
  const randomNumber = Math.random();
  if (randomNumber > 0.3) return true;
  return false;
}

function getEmoji() {
  return emojis[Math.floor(Math.random() * emojis.length)];
}

function getTweet(tweet) {
  return `Thanks for sharing! ${ getEmoji() }`;
}


/* ******************

 Stream

 ******************* */

// const stream = T.stream('statuses/filter', { track: ['backticks & tildes'] });
var stream = T.stream('statuses/sample')
console.log(stream);

stream.on('tweet', (tweet) => {
  console.log(JSON.stringify(tweet));
  console.log()

  // if ( tweet.user.id === bt_bot.id ) {
  //   return;
  // }

  // Twitter.like(tweet);

  // if ( tweet.user.id === proton.id ) {
  //     Twitter.retweet(tweet);
  //   return;
  // }

  // if ( tweet.retweeted_status ) return;

  // if ( tweet.text.toLowerCase().includes('@Bolaji') ) {
  //   if ( shouldSendReply() ) {
  //     Twitter.reply(tweet, getTweet(tweet));
  //   }
  //   return;
  // }

  // Twitter.reply(tweet, getTweet(tweet));
});



