const Ologg = require('./index.js');
const path = require('path');

var logg = new Ologg({
	folder: path.join( __dirname, 'logs'),
	outputFile: false
})

logg.log('Testing this', 'TEST');
logg.log('Testing notype');
logg.log('Testing haha', 'INFO', false);