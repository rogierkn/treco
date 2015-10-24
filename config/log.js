var winston = require('winston');

/*see the documentation for Winston:  https://github.com/flatiron/winston */
var logger = new (winston.Logger)({
  transports: [
    new (winston.transports.Console)( { } ),
    new (winston.transports.File)({ filename: 'logfile.log',
      level: 'verbose',
      json : false,
      colorize : false
    })
  ]
});

module.exports.log = {
  /***************************************************************************
   *                                                                          *
   * Valid `level` configs: i.e. the minimum log level to capture with        *
   * sails.log.*()                                                            *
   *                                                                          *
   * The order of precedence for log levels from lowest to highest is:        *
   * silly, verbose, info, debug, warn, error                                 *
   *                                                                          *
   * You may also set the level to "silent" to suppress all logs.             *
   *                                                                          *
   ***************************************************************************/

  level: 'silly',
  colorize: false,
  custom:logger
};
