const Ologg = require('./index.js');
const path = require('path');

var logg = new Ologg({
   folder: path.join( __dirname, 'logs'),
})

logg.log('Hey man');
logg.log('This is a test');

logg.info('test');
logg.info('test');
logg.error('OH NOES!');
logg.info('entry');
logg.error('THERE WAS AN ERROR!!!');
logg.info('test');
logg.info('test');