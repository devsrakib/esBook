import { SQLiteDatabase } from "expo-sqlite";
import * as FileSystem from "expo-file-system";
import { ICustomerDataInput } from "@/types/interfaces/input.interface";

export async function migrateDbIfNeeded(db: SQLiteDatabase) {
  const DATABASE_VERSION = 2;
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

    CREATE TABLE IF NOT EXISTS customers (
      id INTEGER PRIMARY KEY NOT NULL,
      fullName VARCHAR NOT NULL,
      email VARCHAR NOT NULL,
      phoneNumber TEXT NOT NULL,
      address VARCHAR NOT NULL,
      createdAt TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS suppliers (
      id INTEGER PRIMARY KEY NOT NULL,
      fullName VARCHAR NOT NULL,
      email VARCHAR NOT NULL,
      phoneNumber TEXT NOT NULL,
      address VARCHAR NOT NULL,
      createdAt TEXT NOT NULL DEFAULT (datetime('now'))
    );

  `);

    currentDbVersion = 1;
  }
  await db.execAsync(`PRAGMA user_version = ${DATABASE_VERSION}`);
}

interface CustomerData {
  fullName: string;
  email: string;
  phoneNumber: string;
  address: string;
  createdAt: any;
}

//=================  ====================
//=================  ====================
//           customer table
//=================  ====================
//=================  ====================
export const createCustomers = async (
  db: SQLiteDatabase,
  { fullName, email, phoneNumber, address, createdAt }: CustomerData
) => {
  try {
    const timestamp = createdAt || new Date().toISOString();
    await db.runAsync(
      "INSERT INTO customers (fullName, email, phoneNumber, address, createdAt) VALUES (?, ?, ?, ?, ?)",
      [fullName, email, phoneNumber, address, timestamp]
    );
    console.log("Customer created successfully");
  } catch (error) {
    console.error("Error creating customer:", error);
  }
};

//=================  ====================
//=================  ====================
//           supplier table
//=================  ====================
//=================  ====================
export const createSuppliers = async (
  db: SQLiteDatabase,
  { fullName, email, phoneNumber, address, createdAt }: CustomerData
) => {
  try {
    const timestamp = createdAt || new Date().toISOString();
    await db.runAsync(
      "INSERT INTO suppliers (fullName, email, phoneNumber, address, createdAt) VALUES (?, ?, ?, ?, ?)",
      [fullName, email, phoneNumber, address, timestamp]
    );
    console.log("Supplier created successfully");
  } catch (error) {
    console.error("Error creating supplier:", error);
  }
};

//=================  ====================
//=================  ====================

export const getCustomers = async (db: SQLiteDatabase) => {
  return await db.getAllAsync("SELECT * FROM customers");
};

//=================  ====================
//=================  ====================
export const getSuppliers = async (db: SQLiteDatabase) => {
  return await db.getAllAsync("SELECT * FROM suppliers");
};
