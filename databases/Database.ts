import { SQLiteDatabase } from "expo-sqlite";
import * as FileSystem from "expo-file-system";
import { ICustomerDataInput } from "@/types/interfaces/input.interface";

export async function migrateDbIfNeeded(db: SQLiteDatabase) {
  console.log(FileSystem.documentDirectory);

  const DATABASE_VERSION = 1;
  let result = await db.getFirstAsync<{
    user_version: number;
  }>("PRAGMA user_version");

  let currentDbVersion = result?.user_version ?? 0;

  if (currentDbVersion >= DATABASE_VERSION) {
    console.log("ALREADY ON LATEST DB VERSION");

    return;
  }
  if (currentDbVersion === 0) {
    const result = await db.execAsync(`
  PRAGMA journal_mode = 'wal';
  CREATE TABLE IF NOT EXISTS customers (id INTEGER PRIMARY KEY NOT NULL AUTOINCREMENT, fullName VARCHAR NOT NULL, email VARCHAR NOT NULL,  phoneNumber text NUT NULL, address VARCHAR NOT NULL);
  `);
    console.log("HELLO", result);

    currentDbVersion = 1;
  }
  // if (currentDbVersion === 1) {
  //   Add more migrations
  // }
  await db.execAsync(`PRAGMA user_version = ${DATABASE_VERSION}`);
}

interface CustomerData {
  fullName: string;
  email: string;
  phoneNumber: string;
  address: string; // Assuming profilePhoto is a string (URL or base64)
}

export const createCustomers = async (
  db: SQLiteDatabase,
  { fullName, email, phoneNumber, address }: CustomerData
) => {
  try {
    await db.runAsync(
      "INSERT INTO customers (fullName, email, phoneNumber, address) VALUES (?, ?, ?, ?)",
      [fullName, email, phoneNumber, address]
    );
    console.log("Customer created successfully");
  } catch (error) {
    console.error("Error creating customer:", error);
  }
};

export const getCustomers = async (db: SQLiteDatabase) => {
  return await db.getAllAsync("SELECT * FROM customers");
};
