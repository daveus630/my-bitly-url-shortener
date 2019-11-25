const SimpleNodeLogger = require('simple-node-logger');

module.exports = {
    logTrace : (long, short) => {
        let option = {
            logFilePath:'temp/logfile.log',
            timestampFormat:'YYYY-MM-DD HH:mm:ss.SSS'
        }
        log = SimpleNodeLogger.createSimpleLogger(option);
        log.setLevel('trace');
    
        return log.trace(long+" -> "+short);
    }
}