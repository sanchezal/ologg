const fs = require('fs-extra');
const path = require('path');

exports.ologg = class {
   /**
    * 
    * @param {Object} settings Settings for Ologg
    * @param {String} settings.singleFile File location of the single file that Ologg will output
    * @param {Boolean} settings.outputConsole Should Ologg output to console too.
    * @param {Boolean} settings.includeTime Should Ologg include the time on the log line.
    * @param {Boolean} settings.folder Folder that Ologg will output the log files.
    */
   constructor(settings){
      console.log(settings);
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
         return null;
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
      message = (this.settings.includeTime ? `[${this.getTime()}]` : '') + '[INFO]: ' + message;
      if(this.settings.outputConsole)console.log(message);
      if(this.settings.folder){
         var filePath = this.getFile();
         var logFile = fs.readFileSync(filePath);
         logFile += message + '\n';
         fs.writeFileSync(filePath, logFile);
      }
   }
   
   /**
    * Logs into the log file an error message.
    * @param {*} message Error message to log.
    */
   error(message){
      message = (this.settings.includeTime ? `\n[${this.getTime()}]` : '') + '[ERROR]: ' + message + '\n';
      if(this.settings.outputConsole)console.log(message);
      if(this.settings.folder){
         var filePath = this.getFile();
         var logFile = fs.readFileSync(filePath);
         logFile += message + '\n';
         fs.writeFileSync(filePath, logFile);
      }
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