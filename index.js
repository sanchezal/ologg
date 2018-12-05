const fs = require('fs');
const path = require('path');

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
      this.getFile();
   }

   /**
    * Gets the current log file.
    */
   getFile(){
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
   info(message){
      return this.log(message, 'INFO');
   }
   
   /**
    * Logs into the log file an error message.
    * @param {*} message Error message to log.
    */
   error(message){
		message = (this.settings.includeTime ? `\n[${this.getTime()}]` : '') + '[ERROR]: ' + message + '\n';
		return this.log(message, false, false);
	}
	
	/**
	 * Log a message
	 * @param {string} message The message to log.
	 * @param {string} type The type of message. Ex. INFO
	 * @param {boolean} format If the message should not be formatted
	 */
	log(message, type='INFO', format=true){
		if(format) message = (this.settings.includeTime ? `[${this.getTime()}]` : '') + `[${type}]: ` + message;
		if(this.settings.outputConsole)console.log(message);
      if(this.settings.folder){
         var filePath = this.getFile();
         var logFile = fs.readFileSync(filePath);
         logFile += message + '\n';
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
}