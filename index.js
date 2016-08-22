/* ******************

	Fixes for Heroku
	See http://stackoverflow.com/a/31094668

******************* */

const express = require('express');
const app = express();
app.set('port', (process.env.PORT || 5000));
app.get('/', function(request, response) {
    var result = 'App is running'
    response.send(result);
}).listen(app.get('port'), function() {
    console.log('App is running, server is listening on port ', app.get('port'));
});


/* ******************

	The Setup

******************* */
const Twit = require('twit');
const T = new Twit({
	consumer_key: process.env.consumer_key,
	consumer_secret: process.env.consumer_secret,
	access_token: process.env.access_token,
	access_token_secret: process.env.access_token_secret
});


/* ******************

	Key Variables

******************* */
const me = {
	id: 2714960622,
	screen_name: 'ireaderinokun'
};

const botsofcode = {
	id: 743145993844179000,
	screen_name: 'botsofcode'
};

const emojis = ['👊', '👊', '🙌', '👍', '💁', '👌', '🙅', '👯'];


/* ******************

	Tweet Functions

******************* */
const tweet = (tweet) => {
	T.post('statuses/update', {
		status: tweet
	});
}

const retweet = (tweet) => {
	T.post('statuses/retweet/:id', { id: tweet.id_str });
};

const reply = (tweet, reply) => {
	T.post('statuses/update', {
		status: `@${tweet.user.screen_name} ${reply}`,
		in_reply_to_status_id: tweet.id_str
	});
}

const like = (tweet) => {
	T.post('favorites/create', { id: tweet.id_str });
}

const addToList = (list, user) => {
	T.post('lists/members/create', {
		slug: list,
		owner_screen_name: botsofcode.screen_name,
		screen_name: user
	});
}





/* ******************

	Stream

******************* */

const stream = T.stream('statuses/filter', { track: ['bitsofco.de', 'bitsofcode'] });

stream.on('tweet', (tweet) => {

	if ( tweet.user.id === botsofcode.id ) {
		return;
	}

	if ( tweet.user.id === me.id ) {
		retweet(tweet);
	}

	like(tweet);

	if ( tweet.text.includes('@ireaderinokun') ) {
		reply(tweet, `Thanks for sharing! ${emojis[Math.floor(Math.random() * emojis.length)]}`);
		//addToList('bitsofcoders', tweet.user.screen_name);
		return;
	} 

	reply(tweet, `Thanks for sharing! ${emojis[Math.floor(Math.random() * emojis.length)]} (cc @${me.screen_name})`);

});