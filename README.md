# Ologg

Simple node.js logger.

## Installation
```bash
npm install ologg
```
## Getting started
```javascript
const Ologg = require('ologg').ologg;
const logg = new Ologg({
   outputConsole: true, //Should entries be output to console.
   singleFile: '/path/to/log/file', //If you want to output to a single file, set it here.
   folder: '/path/to/folder', //Path to the folder that the logs will be saved. 
                              //By default logs are separated by date.
   includeTime: true //Should timestamp be added to entries.
})
//If single file and folder are set, Ologg will use the single file.
//Not all settings are required, but either singleFile or Folder are required.
```

## Ologg.info(message)
```javascript
const logg = new Ologg({
   folder: '/path/to/folder'
});

logg.info('Test!');
logg.info('Hello!!!');
logg.info('World!!!');
```
This will output: 
```
[00:07:48][INFO]: Test!
[00:07:48][INFO]: Hello!!!
[00:07:48][INFO]: World!!!
```

## Ologg.error(message)
Just like info but error adds spacing to make error entries more visible.
```javascript
const logg = new Ologg({
   folder: '/path/to/folder'
});

logg.info('test');
logg.info('test');
logg.error('OH NOES!'); //<= ERROR ENTY
logg.info('info');
logg.info('entry');
logg.error('THERE WAS AN ERROR!!!'); //<= ERROR ENTY
logg.info('test');
logg.info('test');
```
This will output: 
```
[00:09:37][INFO]: test
[00:09:37][INFO]: test

[00:09:37][ERROR]: OH NOES!

[00:09:37][INFO]: info
[00:09:37][INFO]: entry

[00:09:37][ERROR]: THERE WAS AN ERROR!!!

[00:09:37][INFO]: test
[00:09:37][INFO]: test
```

## Ologg.setOutputConsole(bool)
Should ologg output to console too.
```javascript
logg.setOutputConsole(false) //Ologg will now not output to console too.
```

## Ologg.setIncludeTime(bool)
Should ologg output to console too.
```javascript
logg.setIncludeTime(false) //Ologg will now not include a timestamp in every entry.
```