const readline = require('readline');
const Twit = require('twit');
const config = require('./config.js');

const T = new Twit(config);

console.log(`Are you sure you want to delete all tweets from user @${process.argv[2]}? [Y/N]`);

readline.emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);

process.stdin.on('keypress', (str, key) => {
    if (key.name == 'y' || key.name == 'Y') {
        console.log("Deleting all tweets...");
        T.get('statuses/user_timeline', {
            screen_name: process.argv[2],
            exclude_replies: false
        })
        .then(function({ data }) {
            data.forEach(e => {
                T.post('statuses/destroy', { id: e.id_str });
            });
            process.exit();
        });
    }
    else if ((key.name == 'n' || key.name == 'N') || (key.ctrl && key.name === 'c')) {
        process.exit();
    }
});
