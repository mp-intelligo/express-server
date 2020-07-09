import { verbose } from 'sqlite3';
import * as path from 'path';

const sqlite3 = verbose();

const DBSOURCE = path.join(__dirname, 'db.sqlite');

/* 
TODO: Move prepare and run logic over here
*/

export const db = new sqlite3.Database(DBSOURCE, (err) => {
  if (err) {
    throw err;
  } else {
    console.log('Connected to the SQLite database.');
  }
});

export const closeDb = () => db.close(error => {
  if (error) {
    console.error(error);
  } else {
    console.log('Closed DB connection');
  }
});