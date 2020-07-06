import { verbose } from 'sqlite3';

const sqlite3 = verbose();

const DBSOURCE = "./src/db/db.sqlite";

const db = new sqlite3.Database(DBSOURCE, (err) => {
  if (err) {
    throw err;
  } else {
    console.log('Connected to the SQLite database.');
  }
});

const closeDb = () => db.close(error => {
  if (error) {
    console.error(error);
  } else {
    console.log('Closed DB connection');
  }
});

export {
  db,
  closeDb
};