import query from './database';

// Run the necessary queries to get the database set up.
// Delete the current database if it exists.
console.log(`This command will only work if you have installed Postgres on a server and configured ./database.js to point to it.
  You also need to set up a database user. If an error occurs, make sure you've configured it right.`);

console.log(`This drops the schema, which will erase all tables on the database. I hope you know what you're doing.`);

query('DROP SCHEMA public CASCADE')
.then(() => query('CREATE SCHEMA public'))
.then(() => query('GRANT ALL ON SCHEMA public TO thorium'))
.then(() => query('GRANT ALL ON SCHEMA public TO public'))
//Now create the tables that we need.
.then(() => query(''));


