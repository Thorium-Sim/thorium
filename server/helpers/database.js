var pg = require('pg');

// create a config to configure both pooling behavior
// and client options
// note: all config is optional and the environment variables
// will be read if the config is not present
var config = {
  user: 'thorium', //env var: PGUSER
  database: 'thorium', //env var: PGDATABASE
  password: 'rommel1942', //env var: PGPASSWORD
  host: 'localhost', // Server hosting the postgres database
  port: 5432, //env var: PGPORT
  max: 10, // max number of clients in the pool
  idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
};


//this initializes a connection pool
//it will keep idle connections open for a 30 seconds
//and set a limit of maximum 10 idle clients
var pool = new pg.Pool(config);

pool.on('error', function (err, client) {
  // if an error is encountered by a client while it sits idle in the pool
  // the pool itself will emit an error event with both the error and
  // the client which emitted the original error
  // this is a rare occurrence but can happen if there is a network partition
  // between your application and the database, the database restarts, etc.
  // and so you might want to handle it and at least log it out
  log.error('idle client error', err.message, err.stack)
})

// Make my fancy function for running queries
export function query(query, params) {
  return new Promise(function(fulfill, reject) {
    pool.connect(function(err, client, done) {
      if (err) {
        reject({message: 'pSQL ERROR: Error fetching client from pool', err});
      }
      client.query(query, params, function(err, result){
        done(err);

        if (err) {
          reject({message: 'pSQL Error: Error running query', err});
        }
        fulfill(result);
      })
    })
  })
}