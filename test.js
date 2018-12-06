const Ologg = require('./index.js');
const path = require('path');

var logg = new Ologg({
	folder: path.join( __dirname, 'logs'),
})

logg.info('test', 'lmao');
logg.error('ERROR IN CONEKTA', {
	test: 'haha test',
	lol: {
		asd: 'lmaso',
		test: ['asd', 'asdmo', 'aosdmas'],
		asdlm: { hah: 'jeje' }
	}
})