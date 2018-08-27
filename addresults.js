module.exports = function(callback) {//pass callback function and return with this
    var oracledb = require('oracledb');
    var dbConfig = require('./dbconfig.js');
    oracledb.autoCommit = true;
  
    this.addDB = function(query,callback) {
      oracledb.getConnection({
          user: dbConfig.dbuser,
          password: dbConfig.dbpassword,
          connectString: dbConfig.connectString
  
      }, function(err, connection) {
        if (err) {
          console.error(err.message);
          return callback(err);
        }
        connection.execute(query, function(err, result) {
          if (err) {
            console.error(err.message);
            doRelease(connection);
            return;
          }
          return callback(null, result)
        });
      });
  
      function doRelease(connection) {
        connection.release(function(err) {
          if (err) {
            console.error(err.message);
            return callback(err);
          }
        });
      }
    };
  };