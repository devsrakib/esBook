import { SQLiteDatabase } from "expo-sqlite";
import * as FileSystem from "expo-file-system";

export async function migrateDbIfNeeded(db: SQLiteDatabase) {
  console.log(FileSystem.documentDirectory);

  const DATABASE_VERSION = 1;
  let result = await db.getFirstAsync<{
    user_version: number;
  }>("PRAGMA user_version");

  let currentDbVersion = result?.user_version ?? 0;

  if (currentDbVersion >= DATABASE_VERSION) {
    return;
  }
  if (currentDbVersion === 0) {
    const result = await db.execAsync(`
  PRAGMA journal_mode = 'wal';
  CREATE TABLE customers (id INTEGER PRIMARY KEY NOT NULL, fullName VARCHAR NOT NULL, email VARCHAR NOT NULL,  phoneNumber VARCHAR NUT NULL, address VARCHAR NOT NULL);
  `);
    await db.runAsync(
      "INSERT INTO todos (value, intValue) VALUES (?, ?)",
      "hello",
      1
    );
    await db.runAsync(
      "INSERT INTO todos (value, intValue) VALUES (?, ?)",
      "world",
      2
    );
    console.log(result);

    currentDbVersion = 1;
  }
  // if (currentDbVersion === 1) {
  //   Add more migrations
  // }
  await db.execAsync(`PRAGMA user_version = ${DATABASE_VERSION}`);
}
