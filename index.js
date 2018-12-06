const fs = require('fs');
const path = require('path');
const pretty = require('prettyjson');

module.exports = class {
   /**
    * 
    * @param {Object} settings Settings for Ologg
    * @param {String} settings.singleFile File location of the single file that Ologg will output
    * @param {Boolean} settings.outputConsole Should Ologg output to console too.
    * @param {Boolean} settings.includeTime Should Ologg include the time on the log line.
    * @param {Boolean} settings.folder Folder that Ologg will output the log files.
    * @param {Boolean} settings.outputFile Folder that Ologg will output the log files.
    */
   constructor(settings){
      this.settings = settings;
		this.settings.includeTime = (this.settings.includeTime ? this.settings.includeTime : true);
		this.settings.outputConsole = (this.settings.outputConsole ? this.settings.outputConsole : true);
		this.settings.outputFile = (this.settings.outputFile ? this.settings.outputFile : true);
      this.getFile();
   }

   /**
    * Gets the current log file.
    */
   getFile(){
		if(!this.settings.outputFile)return false;
      if(this.settings.singleFile)return this.settings.singleFile;
      if(this.settings.folder){
			var date = new Date();
			if(!fs.existsSync(this.settings.folder))fs.mkdirSync(this.settings.folder);
         var filePath = path.join(this.settings.folder, [
            date.getFullYear(), 
            date.getMonth()+1, 
            date.getDate()
         ].join('-') + '.log');
         try{
            fs.readFileSync(filePath);
         }catch(e){
            fs.writeFileSync(filePath, "");
         }
         return filePath;
      }else{
         return false;
      }
   }

   /**
    * Gets the time. Its just useful.
    */
   getTime(){
      var date = new Date();
      return [('00'+date.getHours()).slice(-2), ('00'+date.getMinutes()).slice(-2), ('00'+date.getSeconds()).slice(-2)].join(':');
   }

   /**
    * Logs into the log file the give message.
    * @param {string} message Message to log.
    */
   info(...message){
		var msgs = []
		for(var i of message){
			msgs.push(this.log(i, 'INFO'));
		}
      return msgs.length==1 ? msgs[0] : msgs;
   }
   
   /**
    * Logs into the log file an error message.
    * @param {*} message Error message to log.
    */
   error(...message){
		// console.log
		// message = (this.settings.includeTime ? `\n[${this.getTime()}]` : '') + '[ERROR]: ' + message + '\n';
		// return this.log(message, false, false);

		var msgs = []
		msgs.push(this.log('\n', false, false));
		for(var i of message){
			msgs.push(this.log((this.settings.includeTime ? `[${this.getTime()}]` : '') + '[ERROR]: ' + this._formatMsg(i), false, false));
		}
		msgs.push(this.log('\n', false, false));
      return msgs.length==1 ? msgs[0] : msgs;
	}
	
	/**
	 * Log a message
	 * @param {string} message The message to log.
	 * @param {string} type The type of message. Ex. INFO
	 * @param {boolean} format If the message should not be formatted
	 */
	log(message, type=false, format=true){
		var msg = message;
		if(format){
			msg = (this.settings.includeTime ? `[${this.getTime()}]` : '') + (type ? `[${type}]: ` : ': ') + this._formatMsg(message);
		}
		if(this.settings.outputConsole)console.log(msg);
      if(this.settings.outputFile){
			var filePath = this.getFile();
			if(!filePath)return msg;
         var logFile = fs.readFileSync(filePath);
         logFile += msg + '\n';
         fs.writeFileSync(filePath, logFile);
		}
		return message;
	}

   /**
    * Sets if messages should be output to console.
    * @param {boolean} should Should messages be output to console.
    */
   setOutputConsole(should){
      this.settings.outputConsole = should;
   }

   /**
    * Sets if log entries should have a timestamp
    * @param {boolean} should Should timestamp be added to entries.
    */
   setIncludeTime(should){
      this.settings.includeTime = should;
	}
	
	_formatMsg(msg){
		if(typeof msg === 'object'){
			return '\n'+pretty.render(msg);
		}else{
			return msg;
		}
	}
}