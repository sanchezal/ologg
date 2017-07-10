const ologg = require('./index.js').ologg;
const path = require('path');

var logg = new ologg({
   folder: path.join( __dirname, '..', 'logs'),
})

logg.info('test');
logg.info('test');
logg.error('OH NOES!');
logg.info('entry');
logg.error('THERE WAS AN ERROR!!!');
logg.info('test');
logg.info('test');