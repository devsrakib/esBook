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
    await db.execAsync(`
      PRAGMA journal_mode = 'wal';

      CREATE TABLE IF NOT EXISTS customer (
        id INTEGER PRIMARY KEY NOT NULL,
        profilePhoto TEXT,
        name VARCHAR NOT NULL,
        email VARCHAR NOT NULL,
        address VARCHAR NOT NULL,
        phone TEXT NOT NULL,
        taxNumber TEXT,
        createdAt TEXT NOT NULL DEFAULT (datetime('now'))
      );

      CREATE TABLE IF NOT EXISTS supplier (
        id INTEGER PRIMARY KEY NOT NULL,
        profilePhoto TEXT,
        name VARCHAR NOT NULL,
        email VARCHAR NOT NULL,
        address VARCHAR NOT NULL,
        phone TEXT NOT NULL,
        taxNumber TEXT,
        createdAt TEXT NOT NULL DEFAULT (datetime('now'))
      );

      CREATE TABLE IF NOT EXISTS cash_sell (
        id INTEGER PRIMARY KEY NOT NULL,
        customerId INTEGER NOT NULL,
        saleAmount REAL NOT NULL,
        collectedAmount REAL NOT NULL,
        createdAt TEXT NOT NULL DEFAULT (datetime('now'))
        dueAmount REAL,
        extraAmount REAL,
        description TEXT,
        FOREIGN KEY (customerId) REFERENCES customer(id)
      );

      CREATE TABLE IF NOT EXISTS cash_buy (
        id INTEGER PRIMARY KEY NOT NULL,
        supplierId INTEGER NOT NULL,
        amount REAL NOT NULL,
        createdAt TEXT NOT NULL DEFAULT (datetime('now'))
        description TEXT,
        dueAmount REAL,
        extraAmount REAL,
        FOREIGN KEY (supplierId) REFERENCES supplier(id)
      );

      CREATE TABLE IF NOT EXISTS customer_lend (
        id INTEGER PRIMARY KEY NOT NULL,
        customerId INTEGER NOT NULL,
        amount REAL NOT NULL,
        createdAt TEXT NOT NULL DEFAULT (datetime('now')),
        description TEXT,
        FOREIGN KEY (customerId) REFERENCES customer(id)
      );

      CREATE TABLE IF NOT EXISTS due_collection (
        id INTEGER PRIMARY KEY NOT NULL,
        customerId INTEGER NOT NULL,
        collectedAmount REAL NOT NULL,
        createdAt TEXT NOT NULL DEFAULT (datetime('now')),
        description TEXT,
        FOREIGN KEY (customerId) REFERENCES customer(id)
      );

      CREATE TABLE IF NOT EXISTS collection_reminder (
        id INTEGER PRIMARY KEY NOT NULL,
        customerId INTEGER NOT NULL,
        generalDate TEXT NOT NULL DEFAULT (datetime('now')),
        collectionDate TEXT NOT NULL,
        FOREIGN KEY (customerId) REFERENCES customer(id)
      );

      CREATE TABLE IF NOT EXISTS owner_profile (
        id INTEGER PRIMARY KEY NOT NULL,
        profilePhoto TEXT,
        name VARCHAR NOT NULL,
        email VARCHAR NOT NULL,
        address VARCHAR NOT NULL,
        phone TEXT NOT NULL,
        taxNumber TEXT,
        logout TEXT
      );

      CREATE TABLE IF NOT EXISTS cash_report (
        id INTEGER PRIMARY KEY NOT NULL,
        date TEXT NOT NULL,
        totalCash REAL NOT NULL
      );

      CREATE TABLE IF NOT EXISTS withdraw (
        id INTEGER PRIMARY KEY NOT NULL,
        amount REAL NOT NULL,
        createdAt TEXT NOT NULL DEFAULT (datetime('now')),
        description TEXT
      );

      CREATE TABLE IF NOT EXISTS expense (
        id INTEGER PRIMARY KEY NOT NULL,
        amount REAL NOT NULL,
        createdAt TEXT NOT NULL DEFAULT (datetime('now')),
        description TEXT
      );

      CREATE TABLE IF NOT EXISTS deposit (
        id INTEGER PRIMARY KEY NOT NULL,
        amount REAL NOT NULL,
        createdAt TEXT NOT NULL DEFAULT (datetime('now')),
        description TEXT
      );
    `);

    currentDbVersion = 1;
  }

  await db.execAsync(`PRAGMA user_version = ${DATABASE_VERSION}`);
}

interface CustomerData {
  profilePhoto?: string;
  name: string;
  email: string;
  address: string;
  phoneNumber: string;
  taxNumber?: string;
  createdAt?: string;
}

interface SupplierData {
  profilePhoto?: string;
  name: string;
  email: string;
  address: string;
  phoneNumber: string;
  taxNumber?: string;
  createdAt?: string;
}

interface CashSellData {
  customerId: number;
  saleAmount: number;
  collectedAmount: number;
  createdAt: string;
  dueAmount: number;
  extraAmount: number;
  description: string;
}

interface CashBuyData {
  supplierId: number;
  amount: number;
  date: string;
  description?: string;
  dueAmount?: number;
  extraAmount?: number;
}

interface lend {
  customerId: number;
  amount: number;
  date: string;
  description?: string;
}

interface DueCollectionData {
  customerId: number;
  collectedAmount: number;
  createdAt: string;
  collectionPurpose: string;
  description: string;
}

interface CollectionReminderData {
  customerId: number;
  createdAt: string;
  collectionDate: string;
}

interface OwnerProfileData {
  profilePhoto: string;
  name: string;
  email: string;
  address: string;
  phoneNumber: string;
  taxNumber: string;
  createdAt: string;
}

interface CashReportData {
  date: string;
  totalCash: number;
}

interface WithdrawData {
  amount: number;
  date: string;
  description?: string;
}

interface ExpenseData {
  amount: number;
  date: string;
  description?: string;
}

interface DepositData {
  amount: number;
  date: string;
  description?: string;
}

//=================  ====================
//=================  ====================
//           customer table
//=================  ====================
//=================  ====================
export const createCustomers = async (
  db: SQLiteDatabase,
  { name, email, phoneNumber, address, createdAt }: CustomerData
) => {
  try {
    const timestamp = createdAt || new Date().toISOString();
    await db.runAsync(
      "INSERT INTO customer (profilePhoto, name, email, address, phoneNumber, taxNumber, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [name, email, phoneNumber, address, timestamp]
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
  { name, email, phoneNumber, address, createdAt }: SupplierData
) => {
  try {
    const timestamp = createdAt || new Date().toISOString();
    await db.runAsync(
      "INSERT INTO supplier (profilePhoto, name, email, address, phoneNumber, taxNumber, createdAt) VALUES (?, ?, ?, ?, ?,?,?)",
      [name, email, phoneNumber, address, timestamp]
    );
    console.log("Supplier created successfully");
  } catch (error) {
    console.error("Error creating supplier:", error);
  }
};

//=================  ====================
//=================  ====================

//=================  ====================
//=================  ====================
//           cash_sell table
//=================  ====================
//=================  ====================
export const cash_sell = async (
  db: SQLiteDatabase,
  {
    saleAmount,
    collectedAmount,
    createdAt,
    dueAmount,
    extraAmount,
    description,
  }: CashSellData
) => {
  try {
    const timestamp = createdAt || new Date().toISOString();
    await db.runAsync(
      "INSERT INTO cash_sell (saleAmount, collectedAmount, createdAt, dueAmount, extraAmount, description) VALUES (?, ?, ?, ?, ?,?)",
      [
        saleAmount,
        collectedAmount,
        timestamp,
        dueAmount,
        extraAmount,
        description,
      ]
    );
    console.log("cash_sell created successfully");
  } catch (error) {
    console.error("Error creating cash_sell:", error);
  }
};

//=================  ====================
//=================  ====================

//=================  ====================
//=================  ====================
//           due collection table
//=================  ====================
//=================  ====================
export const due_collection = async (
  db: SQLiteDatabase,
  {
    collectedAmount,
    createdAt,
    collectionPurpose,
    description,
  }: DueCollectionData
) => {
  try {
    const timestamp = createdAt || new Date().toISOString();
    await db.runAsync(
      "INSERT INTO due_collection (collectedAmount, createdAt, collectionPurpose, description) VALUES (?, ?, ?, ?, ?,?)",
      [collectedAmount, timestamp, collectionPurpose, description]
    );
    console.log("due collection created successfully");
  } catch (error) {
    console.error("Error creating cash_sell:", error);
  }
};

//=================  ====================
//=================  ====================

//=================  ====================
//=================  ====================
//          collection reminder
//=================  ====================
//=================  ====================
export const collection_reminder = async (
  db: SQLiteDatabase,
  { createdAt, collectionDate }: CollectionReminderData
) => {
  try {
    const timestamp = createdAt || new Date().toISOString();
    await db.runAsync(
      "INSERT INTO due_collection (  createdAt, collectionDate,) VALUES (?, ?)",
      [timestamp, collectionDate]
    );
    console.log("collection reminder created successfully");
  } catch (error) {
    console.error("Error creating cash_sell:", error);
  }
};

//=================  ====================
//=================  ====================

//=================  ====================
//=================  ====================
//          collection reminder
//=================  ====================
//=================  ====================
export const Owner_profile = async (
  db: SQLiteDatabase,
  {
    profilePhoto,
    name,
    email,
    address,
    phoneNumber,
    taxNumber,
    createdAt,
  }: OwnerProfileData
) => {
  try {
    const timestamp = createdAt || new Date().toISOString();
    await db.runAsync(
      "INSERT INTO due_collection ( profilePhoto, name, email, address, phoneNumber, taxNumber, createdAt,) VALUE (?, ?, ?, ?, ?, ?, ?",
      [profilePhoto, name, email, address, phoneNumber, taxNumber, timestamp]
    );
    console.log("Owner profile created successfully");
  } catch (error) {
    console.error("Error creating cash_sell:", error);
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
