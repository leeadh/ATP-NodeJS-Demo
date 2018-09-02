module.exports = function(callback) {//pass callback function and return with this
  var oracledb = require('oracledb');
  var dbConfig = require('./dbconfig.js');

  this.queryDB = function(query,callback) {
    oracledb.getConnection({
        user: dbConfig.dbuser,
        password: dbConfig.dbpassword,
        connectString: dbConfig.connectString

    }, function(err, connection) {
      var startTime = Date.now();
      if (err) {
        console.error(err.message);
        return callback(err);
      }
      connection.execute(query, 
        {},
        { 
          prefetchRows: 2000,
          fetchArraySize: 7000
        },
        function(err, result) {
        if (err) {
          console.error(err.message);
          doRelease(connection);
          return;
        }
        var t = ((Date.now() - startTime)/1000);
        console.log(t);
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