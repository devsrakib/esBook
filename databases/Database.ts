import { SQLiteDatabase } from "expo-sqlite";

export async function migrateDbIfNeeded(db: SQLiteDatabase) {
  const DATABASE_VERSION = 11;
  let result = await db.getFirstAsync<{
    user_version: number;
  }>("PRAGMA user_version");

  let currentDbVersion = result?.user_version ?? 0;

  console.log(currentDbVersion);

  if (currentDbVersion >= DATABASE_VERSION) {
    console.log("ALREADY ON LATEST DB VERSION");

    return;
  }
  if (currentDbVersion === 0) {
    await db.execAsync(`
      PRAGMA journal_mode = 'wal';

      CREATE TABLE IF NOT EXISTS customer (
        id INTEGER PRIMARY KEY NOT NULL,
        profilePhoto TEXT NOT NULL,
        name VARCHAR NOT NULL,
        email VARCHAR NOT NULL,
        address VARCHAR NOT NULL,
        phoneNumber TEXT NOT NULL,
        createdAt TEXT NOT NULL DEFAULT (datetime('now'))
      );

      CREATE TABLE IF NOT EXISTS supplier (
        id INTEGER PRIMARY KEY NOT NULL,
        profilePhoto TEXT,
        name VARCHAR NOT NULL,
        email VARCHAR NOT NULL,
        address VARCHAR NOT NULL,
        phoneNumber TEXT NOT NULL,
        createdAt TEXT NOT NULL DEFAULT (datetime('now'))
      );

      CREATE TABLE IF NOT EXISTS cash_sell (
        id INTEGER PRIMARY KEY NOT NULL,
        customerId INTEGER NOT NULL,
        saleAmount REAL NOT NULL,
        collectedAmount REAL NOT NULL,
        createdAt TEXT NOT NULL DEFAULT (datetime('now')),
        dueAmount REAL,
        extraAmount REAL,
        description TEXT,
        FOREIGN KEY (customerId) REFERENCES customer(id)
      );

      CREATE TABLE IF NOT EXISTS cash_buy (
        id INTEGER PRIMARY KEY NOT NULL,
        supplierId INTEGER NOT NULL,
        amount REAL NOT NULL,
        createdAt TEXT NOT NULL DEFAULT (datetime('now')),
        description TEXT,
        dueAmount REAL,
        extraAmount REAL,
        FOREIGN KEY (supplierId) REFERENCES supplier(id)
      );

      CREATE TABLE IF NOT EXISTS customer_lend (
        id INTEGER PRIMARY KEY NOT NULL,
        customerId INTEGER NOT NULL,
        createdAt TEXT NOT NULL DEFAULT (datetime('now')),
        amount REAL NOT NULL,
        description TEXT,
        FOREIGN KEY (customerId) REFERENCES customer(id)
      );
      
      CREATE TABLE IF NOT EXISTS customer_gave (
        id INTEGER PRIMARY KEY NOT NULL,
        customerId INTEGER NOT NULL,
        createdAt TEXT NOT NULL DEFAULT (datetime('now')),
        amount REAL NOT NULL,
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
        amount REAL,
        customerId INTEGER NOT NULL,
        createdAt TEXT NOT NULL DEFAULT (datetime('now')),
        collectionDate TEXT NOT NULL,
        FOREIGN KEY (customerId) REFERENCES customer(id)
      );

      CREATE TABLE IF NOT EXISTS owner_profile (
        id INTEGER PRIMARY KEY NOT NULL,
        profilePhoto TEXT,
        name VARCHAR NOT NULL,
        email VARCHAR NOT NULL,
        address VARCHAR NOT NULL,
        phoneNumber TEXT NOT NULL
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

  // if (currentDbVersion < 11) {
  //   await db.execAsync(`
  //     ALTER TABLE collection_reminder ADD COLUMN amount REAL;
  //   `);
  // }
  // if (currentDbVersion === 3) {
  //   await db.execAsync(`
  //     ALTER TABLE owner_profile ADD COLUMN createdAt TEXT NOT NULL DEFAULT (datetime('now'));
  //   `);
  //   currentDbVersion = 4;
  // }

  // if (currentDbVersion < 5) {
  //   await db.execAsync(`
  //     ALTER TABLE cash_buy ADD COLUMN collectedAmount REAL;
  //   `);
  // }

  await db.execAsync(`PRAGMA user_version = ${DATABASE_VERSION}`);
}

// ================================================================================================
// ================================= customer table start from here ===============================
// ================================================================================================

//=================  ====================
//           customer table
//=================  ====================
export const createCustomers = async (
  db: SQLiteDatabase,
  { profilePhoto, name, email, phoneNumber, address, createdAt }: CustomerData
) => {
  try {
    const timestamp = createdAt || new Date().toISOString();
    await db.runAsync(
      "INSERT INTO customer (profilePhoto, name, email, address, phoneNumber, createdAt) VALUES (?, ?, ?, ?, ?, ?)",
      [profilePhoto, name, email, address, phoneNumber, timestamp]
    );
    console.log("Customer created successfully");
  } catch (error) {
    console.error("Error creating customer:", error);
  }
};

//=================  ====================
//=================  ====================

//=================  ====================
//           cash_sell table
//=================  ====================
export const cash_sell = async (
  db: SQLiteDatabase,
  {
    customerId,
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
      "INSERT INTO cash_sell (customerId,saleAmount, collectedAmount, createdAt, dueAmount, extraAmount, description) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [
        customerId,
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
//           due collection table
//=================  ====================
export const due_collection = async (
  db: SQLiteDatabase,
  { customerId, collectedAmount, createdAt, description }: DueCollectionData
) => {
  try {
    const timestamp = createdAt || new Date().toISOString();
    await db.runAsync(
      "INSERT INTO due_collection (customerId, collectedAmount, createdAt, description) VALUES (?, ?, ?,?)",
      [customerId, collectedAmount, timestamp, description]
    );
    console.log("due collection created successfully");
  } catch (error) {
    console.error("Error creating cash_sell:", error);
  }
};

//=================  ====================
//=================  ====================

//=================  ====================
//          collection reminder
//=================  ====================
export const customer_lend = async (
  db: SQLiteDatabase,
  { customerId, createdAt, amount, description }: lend
) => {
  try {
    const timestamp = createdAt || new Date().toISOString();
    await db.runAsync(
      "INSERT INTO customer_lend (customerId, createdAt, amount, description) VALUES (?, ?, ?, ?)",
      [customerId, timestamp, amount, description]
    );
    console.log(" customer lend created successfully");
  } catch (error) {
    console.error("Error creating customer lend:", error);
  }
};
export const customer_gave = async (
  db: SQLiteDatabase,
  { customerId, createdAt, amount, description }: lend
) => {
  try {
    const timestamp = createdAt || new Date().toISOString();
    await db.runAsync(
      "INSERT INTO customer_gave (customerId, createdAt, amount, description) VALUES (?, ?, ?, ?)",
      [customerId, timestamp, amount, description]
    );
    console.log(" customer gave created successfully");
  } catch (error) {
    console.error("Error creating customer gave:", error);
  }
};

//=================  ====================
//=================  ====================

//=================  ====================
//          collection reminder
//=================  ====================
export const collection_reminder = async (
  db: SQLiteDatabase,
  { amount, customerId, createdAt, collectionDate }: CollectionReminderData
) => {
  try {
    const timestamp = createdAt || new Date().toISOString();
    await db.runAsync(
      "INSERT INTO collection_reminder (amount, customerId, createdAt, collectionDate) VALUES (?, ?, ?, ?)",
      [amount, customerId, timestamp, collectionDate]
    );
    console.log("collection reminder created successfully");
  } catch (error) {
    console.error("Error creating collection_reminder:", error);
  }
};

export const updateDueAmount = async (
  db: SQLiteDatabase,
  { id, newDueAmount }: { id: number; newDueAmount: number }
) => {
  try {
    await db.runAsync("UPDATE cash_sell SET dueAmount = ? WHERE id = ?", [
      newDueAmount,
      id,
    ]);
    console.log(`Due amount updated successfully for ID ${id}`);
  } catch (error) {
    console.error("Error updating due amount:", error);
  }
};

//=================  ====================
//=================  ====================

// =================================================
// =================================================
// =================================================

export const getCustomers = async (db: SQLiteDatabase) => {
  return await db.getAllAsync("SELECT * FROM customer");
};
export const getCustomerById = async (db: SQLiteDatabase, id: number) => {
  try {
    const result = await db.getFirstAsync(
      "SELECT * FROM customer WHERE id = ?",
      [id]
    );
    return result;
  } catch (error) {
    console.error("Error fetching customer by ID:", error);
    return null;
  }
};

export const getCash_sell = async (db: SQLiteDatabase) => {
  return await db.getAllAsync("SELECT * FROM cash_sell");
};
export const getLendById = async (db: SQLiteDatabase, customerId: number) => {
  return await db.getAllAsync(
    "SELECT * FROM customer_lend WHERE customerId = ?",
    [customerId]
  );
};

export const getCashSellsByCustomerId = async (
  db: SQLiteDatabase,
  customerId: number
) => {
  try {
    const results = await db.getAllAsync(
      "SELECT * FROM cash_sell WHERE customerId = ?",
      [customerId]
    );
    return results;
  } catch (error) {
    console.error("Error fetching cash sells by customer ID:", error);
  }
};

// Function to delete a user by ID
export const deleteCustomerById = async (
  db: SQLiteDatabase,
  userId: number
) => {
  try {
    await db.runAsync("DELETE FROM customer WHERE id = ?", [userId]);
    console.log(`User with ID ${userId} deleted successfully`);
  } catch (error) {
    console.error("Error deleting user:", error);
  }
};

export const getCollectionReminder = async (db: SQLiteDatabase) => {
  try {
    return await db.getAllAsync("SELECT * FROM collection_reminder");
  } catch {
    console.log("error get collection_reminder");
  }
};

// =================================================
// =================================================
// =================================================

// =====================================================================================================
// =====================================================================================================

// =====================================================================================================
// ================================= supplier table start from here ====================================
// =====================================================================================================

//=================  ====================
//           supplier table
//=================  ====================
export const createSuppliers = async (
  db: SQLiteDatabase,
  { profilePhoto, name, email, phoneNumber, address, createdAt }: SupplierData
) => {
  try {
    const timestamp = createdAt || new Date().toISOString();
    await db.runAsync(
      "INSERT INTO supplier (profilePhoto,name, email, phoneNumber, address, createdAt) VALUES (?, ?, ?, ?, ?, ?)",
      [profilePhoto, name, email, phoneNumber, address, timestamp]
    );
    console.log("Supplier created successfully");
  } catch (error) {
    console.error("Error creating supplier:", error);
  }
};

//=================  ====================
//=================  ====================

//=================  ====================
//           cash buy table
//=================  ====================
export const cash_buy = async (
  db: SQLiteDatabase,
  {
    supplierId,
    amount,
    createdAt,
    description,
    collectedAmount,
    dueAmount,
    extraAmount,
  }: CashBuyData
) => {
  try {
    const timestamp = createdAt || new Date().toISOString();
    await db.runAsync(
      "INSERT INTO cash_buy (supplierId, amount, createdAt, description, collectedAmount, dueAmount, extraAmount) VALUES (?, ?, ?, ?, ?,?, ?)",
      [
        supplierId,
        amount,
        timestamp,
        description,
        collectedAmount,
        dueAmount,
        extraAmount,
      ]
    );
    console.log("cash buy created successfully");
  } catch (error) {
    console.error("Error creating cash buy:", error);
  }
};

export const getCashBuyBySupplierId = async (
  db: SQLiteDatabase,
  customerId: number
) => {
  try {
    const results = await db.getAllAsync(
      "SELECT * FROM cash_buy WHERE supplierId = ?",
      [customerId]
    );
    return results;
  } catch (error) {
    console.error("Error fetching cash buy by supplier ID:", error);
  }
};
export const getSupplierById = async (db: SQLiteDatabase, id: number) => {
  try {
    const result = await db.getFirstAsync(
      "SELECT * FROM supplier WHERE id = ?",
      [id]
    );
    return result;
  } catch (error) {
    console.error("Error fetching supplier by ID:", error);
    return null;
  }
};
//=================  ====================
//=================  ====================

//=================  ====================
//          collection reminder
//=================  ====================
export const supplier_lend = async (
  db: SQLiteDatabase,
  { createdAt, amount, description }: lend
) => {
  try {
    const timestamp = createdAt || new Date().toISOString();
    await db.runAsync(
      "INSERT INTO due_collection (  createdAt, amount, description) VALUES (?, ?, ?)",
      [timestamp, amount, description]
    );
    console.log(" supplier lend created successfully");
  } catch (error) {
    console.error("Error creating cash_sell:", error);
  }
};

//=================  ====================
//=================  ====================

export const getSuppliers = async (db: SQLiteDatabase) => {
  return await db.getAllAsync("SELECT * FROM supplier");
};

export const getCash_buy = async (db: SQLiteDatabase) => {
  return await db.getAllAsync("SELECT * FROM cash_buy");
};

// =====================================================================================================
// =====================================================================================================

// =====================================================================================================
// ================================= profile table start from here ====================================
// =====================================================================================================

//=================  ====================
//          owner profile
//=================  ====================
export const owner_profile = async (
  db: SQLiteDatabase,
  { profilePhoto, name, email, address, phoneNumber }: OwnerProfileData
) => {
  try {
    // const timestamp = createdAt || new Date().toISOString();
    await db.runAsync(
      "INSERT INTO owner_profile ( profilePhoto, name, email, address, phoneNumber) VALUES (?, ?, ?, ?, ?)",
      [profilePhoto, name, email, address, phoneNumber]
    );
    console.log("Owner profile created successfully");
  } catch (error) {
    console.error("Error creating Owner profile:", error);
  }
};

export const getOwnerProfile = async (db: SQLiteDatabase) => {
  return await db.getAllAsync("SELECT * FROM owner_profile");
};

//=================  ====================
//=================  ====================

// =====================================================================================================
// =====================================================================================================

// =====================================================================================================
// ================================= others table start from here ====================================
// =====================================================================================================

//=================  ====================
//          cash report table
//=================  ====================
export const cash_report = async (
  db: SQLiteDatabase,
  { createdAt, totalCash }: CashReportData
) => {
  try {
    const timestamp = createdAt || new Date().toISOString();
    await db.runAsync(
      "INSERT INTO cash_report ( createdAt, totalCash) VALUES (?, ?)",
      [timestamp, totalCash]
    );
    console.log("cash report created successfully");
  } catch (error) {
    console.error("Error creating cash report:", error);
  }
};

//=================  ====================
//=================  ====================

//=================  ====================
//          expense table
//=================  ====================

export const expense = async (
  db: SQLiteDatabase,
  { amount, createdAt, description }: ExpenseData
) => {
  try {
    const timestamp = createdAt || new Date().toISOString();
    await db.runAsync(
      "INSERT INTO expense (amount, createdAt, description) VALUES (?, ?, ?)",
      [amount, timestamp, description]
    );
    console.log("expense created successfully");
  } catch (error) {
    console.error("Error creating expense:", error);
  }
};

//=================  ====================
//=================  ====================

//=================  ====================
//          expense table
//=================  ====================

export const deposit = async (
  db: SQLiteDatabase,
  { amount, createdAt, description }: DepositData
) => {
  try {
    const timestamp = createdAt || new Date().toISOString();
    await db.runAsync(
      "INSERT INTO deposit (amount, createdAt, description) VALUES (?, ?, ?)",
      [amount, timestamp, description]
    );
    console.log("deposit created successfully");
  } catch (error) {
    console.error("Error creating deposit:", error);
  }
};

//=================  ====================
//=================  ====================

//=================  ====================
//          expense table
//=================  ====================

export const withdraw = async (
  db: SQLiteDatabase,
  { amount, createdAt, description }: WithdrawData
) => {
  try {
    const timestamp = createdAt || new Date().toISOString();
    await db.runAsync(
      "INSERT INTO withdraw (amount ,createdAt, description) VALUES (?, ?, ?)",
      [amount, timestamp, description]
    );
    console.log("withdraw created successfully");
  } catch (error) {
    console.error("Error creating withdraw:", error);
  }
};

export const getExpense = async (db: SQLiteDatabase) => {
  return await db.getAllAsync("SELECT * FROM expense");
};
export const getDeposit = async (db: SQLiteDatabase) => {
  return await db.getAllAsync("SELECT * FROM deposit");
};
export const getWithdraw = async (db: SQLiteDatabase) => {
  return await db.getAllAsync("SELECT * FROM withdraw");
};

//=================  ====================
//=================  ====================

// =====================================================================================================
// =====================================================================================================

// =======================================================
// ============= types are start from here ===============
// =======================================================

export interface CustomerData {
  profilePhoto: string;
  name: string;
  email: string;
  address: string;
  phoneNumber: string;
  createdAt?: string;
}

export interface SupplierData {
  profilePhoto: string;
  name: string;
  email: string;
  address: string;
  phoneNumber: string;
  createdAt?: string;
}

export interface CashSellData {
  customerId: number;
  saleAmount: number;
  collectedAmount: number;
  createdAt: string;
  dueAmount: number;
  extraAmount: number;
  description: string;
}

export interface CashBuyData {
  supplierId: number;
  amount: number;
  collectedAmount: number;
  createdAt: string;
  description: string;
  dueAmount: number;
  extraAmount: number;
}

export interface lend {
  customerId: number;
  amount: number;
  createdAt: string;
  description: string;
}

export interface DueCollectionData {
  customerId: number;
  collectedAmount: number;
  createdAt: string;
  collectionPurpose: string;
  description: string;
}

export interface CollectionReminderData {
  amount: number;
  customerId: number;
  createdAt?: string;
  collectionDate: string;
}

export interface OwnerProfileData {
  profilePhoto: string;
  name: string;
  email: string;
  address: string;
  phoneNumber: string;
  taxNumber: string;
  createdAt: string;
}

export interface CashReportData {
  createdAt: string;
  totalCash: number;
}

export interface WithdrawData {
  amount: number;
  createdAt: string;
  description: string;
}

export interface ExpenseData {
  amount: number;
  createdAt: string;
  description: string;
}

export interface DepositData {
  amount: number;
  createdAt: string;
  description: string;
}
