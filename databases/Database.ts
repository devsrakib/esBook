import uuid from "react-native-uuid";
import { SQLiteDatabase } from "expo-sqlite";

export async function migrateDbIfNeeded(db: SQLiteDatabase) {
  const DATABASE_VERSION = 24; // Ensure this is the correct final version

  let result = await db.getFirstAsync<{ user_version: number }>(
    "PRAGMA user_version"
  );
  let currentDbVersion = result?.user_version ?? 0;
  console.log(currentDbVersion);

  if (currentDbVersion >= DATABASE_VERSION) {
    return; // Database is already up-to-date
  }

  if (currentDbVersion === 0) {
    // Initial schema creation
    await db.execAsync(`
      PRAGMA journal_mode = 'wal';
    `);

    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS customer (
        id TEXT PRIMARY KEY NOT NULL,
        profilePhoto TEXT NOT NULL,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        address TEXT NOT NULL,
        phoneNumber TEXT NOT NULL,
        createdAt TEXT NOT NULL DEFAULT (datetime('now'))
      );
    `);

    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS supplier (
        id TEXT PRIMARY KEY NOT NULL,
        profilePhoto TEXT,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        address TEXT NOT NULL,
        phoneNumber TEXT NOT NULL,
        createdAt TEXT NOT NULL DEFAULT (datetime('now'))
      );
    `);

    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS cash_sell (
        id TEXT PRIMARY KEY NOT NULL,
        customerId INTEGER NOT NULL,
        saleAmount REAL NOT NULL,
        collectedAmount REAL NOT NULL,
        createdAt TEXT NOT NULL DEFAULT (datetime('now')),
        dueAmount REAL,
        extraAmount REAL,
        description TEXT,
        FOREIGN KEY (customerId) REFERENCES customer(id)
      );
    `);

    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS cash_buy (
        id TEXT PRIMARY KEY NOT NULL,
        supplierId INTEGER NOT NULL,
        amount REAL NOT NULL,
        collectedAmount REAL NOT NULL,
        createdAt TEXT NOT NULL DEFAULT (datetime('now')),
        description TEXT,
        dueAmount REAL,
        extraAmount REAL,
        FOREIGN KEY (supplierId) REFERENCES supplier(id)
      );
    `);

    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS customer_lend (
        id TEXT PRIMARY KEY NOT NULL,
        customerId INTEGER NOT NULL,
        createdAt TEXT NOT NULL DEFAULT (datetime('now')),
        amount REAL NOT NULL,
        description TEXT,
        FOREIGN KEY (customerId) REFERENCES customer(id)
      );
    `);

    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS customer_gave (
       id TEXT PRIMARY KEY NOT NULL,
        customerId INTEGER NOT NULL,
        createdAt TEXT NOT NULL DEFAULT (datetime('now')),
        amount REAL NOT NULL,
        description TEXT,
        FOREIGN KEY (customerId) REFERENCES customer(id)
      );
    `);

    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS due_collection (
        id TEXT PRIMARY KEY NOT NULL,
        customerId INTEGER NOT NULL,
        collectedAmount REAL NOT NULL,
        createdAt TEXT NOT NULL DEFAULT (datetime('now')),
        description TEXT,
        FOREIGN KEY (customerId) REFERENCES customer(id)
      );
    `);

    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS collection_reminder (
        id TEXT PRIMARY KEY NOT NULL,
        amount REAL,
        customerId INTEGER NOT NULL,
        createdAt TEXT NOT NULL DEFAULT (datetime('now')),
        collectionDate TEXT NOT NULL,
        FOREIGN KEY (customerId) REFERENCES customer(id)
      );
    `);

    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS owner_profile (
        id TEXT PRIMARY KEY NOT NULL,
        profilePhoto TEXT,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        address TEXT NOT NULL,
        phoneNumber TEXT NOT NULL,
        taxNumber INTEGER
      );
    `);

    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS cash_report (
        id TEXT PRIMARY KEY NOT NULL,
        date TEXT NOT NULL DEFAULT (datetime('now')),
        totalCash REAL NOT NULL
      );
    `);

    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS withdraw (
        id TEXT PRIMARY KEY NOT NULL,
        amount REAL NOT NULL,
        createdAt TEXT NOT NULL DEFAULT (datetime('now')),
        description TEXT
      );
    `);

    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS expense (
        id TEXT PRIMARY KEY NOT NULL,
        amount REAL NOT NULL,
        createdAt TEXT NOT NULL DEFAULT (datetime('now')),
        description TEXT
      );
    `);

    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS deposit (
        id TEXT PRIMARY KEY NOT NULL,
        amount REAL NOT NULL,
        createdAt TEXT NOT NULL DEFAULT (datetime('now')),
        description TEXT
      );
    `);

    currentDbVersion = 1;
  }

  // if (currentDbVersion <= 23) {
  //   // Update the customer table schema
  //   await db.execAsync(`
  //     PRAGMA journal_mode = 'wal';
  //   `);

  //   // Create the new table
  //   await db.execAsync(`
  //     CREATE TABLE IF NOT EXISTS withdraw_new (
  //       id TEXT PRIMARY KEY NOT NULL,
  //       amount REAL NOT NULL,
  //       createdAt TEXT NOT NULL DEFAULT (datetime('now')),
  //       description TEXT
  //     );
  //   `);

  //   // Copy data to the new table
  //   await db.execAsync(`
  //     INSERT INTO withdraw_new (id, amount, createdAt, description)
  //     SELECT CAST(id AS TEXT), amount, createdAt, description
  //     FROM withdraw;
  //   `);

  //   // Drop the old table
  //   await db.execAsync(`
  //     DROP TABLE withdraw;
  //   `);

  //   // Rename the new table to the old table's name
  //   await db.execAsync(`
  //     ALTER TABLE withdraw_new RENAME TO withdraw;
  //   `);

  //   currentDbVersion = 22;
  // }

  // if (currentDbVersion <= 23) {
  //   // Update the customer table schema
  //   await db.execAsync(`
  //     PRAGMA journal_mode = 'wal';
  //   `);

  //   // Create the new table
  //   await db.execAsync(`
  //     CREATE TABLE IF NOT EXISTS deposit_new (
  //       id TEXT PRIMARY KEY NOT NULL,
  //       amount REAL NOT NULL,
  //       createdAt TEXT NOT NULL DEFAULT (datetime('now')),
  //       description TEXT
  //     );
  //   `);

  //   // Copy data to the new table
  //   await db.execAsync(`
  //     INSERT INTO deposit_new (id, amount, createdAt, description)
  //     SELECT CAST(id AS TEXT), amount, createdAt, description
  //     FROM deposit;
  //   `);

  //   // Drop the old table
  //   await db.execAsync(`
  //     DROP TABLE deposit;
  //   `);

  //   // Rename the new table to the old table's name
  //   await db.execAsync(`
  //     ALTER TABLE deposit_new RENAME TO deposit;
  //   `);

  //   currentDbVersion = 22;
  // }

  // if (currentDbVersion <= 23) {
  //   // Update the customer table schema
  //   await db.execAsync(`
  //     PRAGMA journal_mode = 'wal';
  //   `);

  //   // Create the new table
  //   await db.execAsync(`
  //     CREATE TABLE IF NOT EXISTS cash_report_new (
  //        id TEXT PRIMARY KEY NOT NULL,
  //       date TEXT NOT NULL DEFAULT (datetime('now')),
  //       totalCash REAL NOT NULL
  //     );
  //   `);

  //   // Copy data to the new table
  //   await db.execAsync(`
  //     INSERT INTO cash_report_new (id, date, totalCash)
  //     SELECT CAST(id AS TEXT), date, totalCash
  //     FROM cash_report;
  //   `);

  //   // Drop the old table
  //   await db.execAsync(`
  //     DROP TABLE cash_report;
  //   `);

  //   // Rename the new table to the old table's name
  //   await db.execAsync(`
  //     ALTER TABLE cash_report_new RENAME TO cash_report;
  //   `);

  //   currentDbVersion = 22;
  // }
  // if (currentDbVersion <= 23) {
  //   // Update the customer table schema
  //   await db.execAsync(`
  //     PRAGMA journal_mode = 'wal';
  //   `);

  //   // Create the new table
  //   await db.execAsync(`
  //     CREATE TABLE IF NOT EXISTS expense_new (
  //       id TEXT PRIMARY KEY NOT NULL,
  //       amount REAL NOT NULL,
  //       createdAt TEXT NOT NULL DEFAULT (datetime('now')),
  //       description TEXT
  //     );
  //   `);

  //   // Copy data to the new table
  //   await db.execAsync(`
  //     INSERT INTO expense_new (id, amount, createdAt, description)
  //     SELECT CAST(id AS TEXT), amount, createdAt, description
  //     FROM expense;
  //   `);

  //   // Drop the old table
  //   await db.execAsync(`
  //     DROP TABLE expense;
  //   `);

  //   // Rename the new table to the old table's name
  //   await db.execAsync(`
  //     ALTER TABLE expense_new RENAME TO expense;
  //   `);

  //   currentDbVersion = 22;
  // }
  // if (currentDbVersion <= 23) {
  //   // Update the customer table schema
  //   await db.execAsync(`
  //     PRAGMA journal_mode = 'wal';
  //   `);

  //   // Create the new table
  //   await db.execAsync(`
  //     CREATE TABLE IF NOT EXISTS owner_profile_new (
  //       id TEXT PRIMARY KEY NOT NULL,
  //       profilePhoto TEXT,
  //       name TEXT NOT NULL,
  //       email TEXT NOT NULL,
  //       address TEXT NOT NULL,
  //       phoneNumber TEXT NOT NULL,
  //       taxNumber INTEGER
  //     );
  //   `);

  //   // Copy data to the new table
  //   await db.execAsync(`
  //     INSERT INTO owner_profile_new (id, profilePhoto, name, email, address, phoneNumber, taxNumber)
  //     SELECT CAST(id AS TEXT), profilePhoto, name, email, address, phoneNumber, taxNumber
  //     FROM owner_profile;
  //   `);

  //   // Drop the old table
  //   await db.execAsync(`
  //     DROP TABLE owner_profile;
  //   `);

  //   // Rename the new table to the old table's name
  //   await db.execAsync(`
  //     ALTER TABLE owner_profile_new RENAME TO owner_profile;
  //   `);

  //   currentDbVersion = 22;
  // }
  // if (currentDbVersion <= 23) {
  //   // Switch to Write-Ahead Logging mode
  //   await db.execAsync(`PRAGMA journal_mode = 'wal';`);

  //   // Create the new collection_reminder table with updated schema
  //   await db.execAsync(`
  //     CREATE TABLE IF NOT EXISTS collection_reminder_new (
  //       id TEXT PRIMARY KEY NOT NULL,
  //       amount REAL,
  //       customerId INTEGER NOT NULL,
  //       createdAt TEXT NOT NULL DEFAULT (datetime('now')),
  //       collectionDate TEXT NOT NULL,
  //       FOREIGN KEY (customerId) REFERENCES customer(id)
  //     );
  //   `);

  //   // Copy the existing data to the new table
  //   await db.execAsync(`
  //     INSERT INTO collection_reminder_new (id, amount, customerId, createdAt, collectionDate)
  //     SELECT CAST(id AS TEXT), amount, customerId, createdAt, collectionDate
  //     FROM collection_reminder;
  //   `);

  //   // Drop the old collection_reminder table
  //   await db.execAsync(`DROP TABLE collection_reminder;`);

  //   // Rename the new table to the old table's name
  //   await db.execAsync(
  //     `ALTER TABLE collection_reminder_new RENAME TO collection_reminder;`
  //   );

  //   // Update the current database version to 22
  //   currentDbVersion = 22;
  // }
  // if (currentDbVersion <= 23) {
  //   // Switch to Write-Ahead Logging mode
  //   await db.execAsync(`PRAGMA journal_mode = 'wal';`);

  //   // Create the new collection_reminder table with updated schema
  //   await db.execAsync(`
  //     CREATE TABLE IF NOT EXISTS due_collection_new (
  //        id TEXT PRIMARY KEY NOT NULL,
  //       customerId INTEGER NOT NULL,
  //       collectedAmount REAL NOT NULL,
  //       createdAt TEXT NOT NULL DEFAULT (datetime('now')),
  //       description TEXT,
  //       FOREIGN KEY (customerId) REFERENCES customer(id)
  //     );
  //   `);

  //   // Copy the existing data to the new table
  //   await db.execAsync(`
  //     INSERT INTO due_collection_new (id, customerId, collectedAmount, createdAt, description)
  //     SELECT CAST(id AS TEXT), customerId, collectedAmount, createdAt, description
  //     FROM due_collection;
  //   `);

  //   // Drop the old collection_reminder table
  //   await db.execAsync(`DROP TABLE due_collection;`);

  //   // Rename the new table to the old table's name
  //   await db.execAsync(
  //     `ALTER TABLE due_collection_new RENAME TO due_collection;`
  //   );

  //   // Update the current database version to 22
  //   currentDbVersion = 22;
  // }
  // if (currentDbVersion <= 23) {
  //   // Switch to Write-Ahead Logging mode
  //   await db.execAsync(`PRAGMA journal_mode = 'wal';`);

  //   // Create the new collection_reminder table with updated schema
  //   await db.execAsync(`
  //     CREATE TABLE IF NOT EXISTS customer_gave_new (
  //       id TEXT PRIMARY KEY NOT NULL,
  //       customerId INTEGER NOT NULL,
  //       createdAt TEXT NOT NULL DEFAULT (datetime('now')),
  //       amount REAL NOT NULL,
  //       description TEXT,
  //       FOREIGN KEY (customerId) REFERENCES customer(id)
  //     );
  //   `);

  //   // Copy the existing data to the new table
  //   await db.execAsync(`
  //     INSERT INTO customer_gave_new (id, customerId, createdAt, amount, description)
  //     SELECT CAST(id AS TEXT), customerId, createdAt, amount, description
  //     FROM customer_gave;
  //   `);

  //   // Drop the old collection_reminder table
  //   await db.execAsync(`DROP TABLE customer_gave;`);

  //   // Rename the new table to the old table's name
  //   await db.execAsync(
  //     `ALTER TABLE customer_gave_new RENAME TO customer_gave;`
  //   );

  //   // Update the current database version to 22
  //   currentDbVersion = 22;
  // }
  // if (currentDbVersion <= 23) {
  //   // Switch to Write-Ahead Logging mode
  //   await db.execAsync(`PRAGMA journal_mode = 'wal';`);

  //   // Create the new collection_reminder table with updated schema
  //   await db.execAsync(`
  //     CREATE TABLE IF NOT EXISTS customer_lend_new (
  //      id TEXT PRIMARY KEY NOT NULL,
  //       customerId INTEGER NOT NULL,
  //       createdAt TEXT NOT NULL DEFAULT (datetime('now')),
  //       amount REAL NOT NULL,
  //       description TEXT,
  //       FOREIGN KEY (customerId) REFERENCES customer(id)
  //     );
  //   `);

  //   // Copy the existing data to the new table
  //   await db.execAsync(`
  //     INSERT INTO customer_lend_new (id, customerId, createdAt, amount, description)
  //     SELECT CAST(id AS TEXT), customerId, createdAt, amount, description
  //     FROM customer_lend;
  //   `);

  //   // Drop the old collection_reminder table
  //   await db.execAsync(`DROP TABLE customer_lend;`);

  //   // Rename the new table to the old table's name
  //   await db.execAsync(
  //     `ALTER TABLE customer_lend_new RENAME TO customer_lend;`
  //   );

  //   // Update the current database version to 22
  //   currentDbVersion = 22;
  // }
  // if (currentDbVersion <= 23) {
  //   // Switch to Write-Ahead Logging mode
  //   await db.execAsync(`PRAGMA journal_mode = 'wal';`);

  //   // Create the new collection_reminder table with updated schema
  //   await db.execAsync(`
  //     CREATE TABLE IF NOT EXISTS cash_buy_new (
  //      id TEXT PRIMARY KEY NOT NULL,
  //       supplierId INTEGER NOT NULL,
  //       amount REAL NOT NULL,
  //       collectedAmount REAL NOT NULL,
  //       createdAt TEXT NOT NULL DEFAULT (datetime('now')),
  //       description TEXT,
  //       dueAmount REAL,
  //       extraAmount REAL,
  //       FOREIGN KEY (supplierId) REFERENCES supplier(id)
  //     );
  //   `);

  //   // Copy the existing data to the new table
  //   await db.execAsync(`
  //     INSERT INTO cash_buy_new (id, supplierId, amount, collectedAmount, createdAt, description, dueAmount, extraAmount)
  //     SELECT CAST(id AS TEXT), supplierId, amount, collectedAmount, createdAt, description, dueAmount, extraAmount
  //     FROM cash_buy;
  //   `);

  //   // Drop the old collection_reminder table
  //   await db.execAsync(`DROP TABLE cash_buy;`);

  //   // Rename the new table to the old table's name
  //   await db.execAsync(`ALTER TABLE cash_buy_new RENAME TO cash_buy;`);

  //   // Update the current database version to 22
  //   currentDbVersion = 22;
  // }
  // if (currentDbVersion <= 23) {
  //   // Switch to Write-Ahead Logging mode
  //   await db.execAsync(`PRAGMA journal_mode = 'wal';`);

  //   // Create the new collection_reminder table with updated schema
  //   await db.execAsync(`
  //     CREATE TABLE IF NOT EXISTS cash_sell_new (
  //      id TEXT PRIMARY KEY NOT NULL,
  //       customerId INTEGER NOT NULL,
  //       saleAmount REAL NOT NULL,
  //       collectedAmount REAL NOT NULL,
  //       createdAt TEXT NOT NULL DEFAULT (datetime('now')),
  //       dueAmount REAL,
  //       extraAmount REAL,
  //       description TEXT,
  //       FOREIGN KEY (customerId) REFERENCES customer(id)
  //     );
  //   `);

  //   // Copy the existing data to the new table
  //   await db.execAsync(`
  //     INSERT INTO cash_sell_new (id, customerId, saleAmount, collectedAmount, createdAt, description, dueAmount, extraAmount)
  //     SELECT CAST(id AS TEXT), customerId, saleAmount, collectedAmount, createdAt, description, dueAmount, extraAmount
  //     FROM cash_sell;
  //   `);

  //   // Drop the old collection_reminder table
  //   await db.execAsync(`DROP TABLE cash_sell;`);

  //   // Rename the new table to the old table's name
  //   await db.execAsync(`ALTER TABLE cash_sell_new RENAME TO cash_sell;`);

  //   // Update the current database version to 22
  //   currentDbVersion = 22;
  // }
  // if (currentDbVersion <= 24) {
  //   // Switch to Write-Ahead Logging mode
  //   await db.execAsync(`PRAGMA journal_mode = 'wal';`);

  //   // Create the new collection_reminder table with updated schema
  //   await db.execAsync(`
  //     CREATE TABLE IF NOT EXISTS customer_new (
  //      id TEXT PRIMARY KEY NOT NULL,
  //       profilePhoto TEXT,
  //       name TEXT NOT NULL,
  //       email TEXT NOT NULL,
  //       address TEXT NOT NULL,
  //       phoneNumber TEXT NOT NULL,
  //       createdAt TEXT NOT NULL DEFAULT (datetime('now'))
  //     );
  //   `);

  //   // Copy the existing data to the new table
  //   await db.execAsync(`
  //     INSERT INTO customer_new (id, profilePhoto, name, email, address, phoneNumber, createdAt)
  //     SELECT CAST(id AS TEXT), profilePhoto, name, email, address, phoneNumber, createdAt
  //     FROM customer;
  //   `);

  //   // Drop the old collection_reminder table
  //   await db.execAsync(`DROP TABLE customer;`);

  //   // Rename the new table to the old table's name
  //   await db.execAsync(`ALTER TABLE customer_new RENAME TO customer;`);

  //   // Update the current database version to 22
  //   currentDbVersion = 23;
  // }

  await db.execAsync(`PRAGMA user_version = ${DATABASE_VERSION}`);
}

// ================================================================================================
// ================================= customer table start from here ===============================
// ================================================================================================

//=================  ====================
//           customer table
//=================  ====================
// export const createCustomers = async (
//   db: SQLiteDatabase,
//   { profilePhoto, name, email, phoneNumber, address, createdAt }: CustomerData
// ) => {
//   try {
//     const id = uuidv4();
//     const timestamp = createdAt || new Date().toISOString();
//     await db.runAsync(
//       "INSERT INTO customer (profilePhoto, name, email, address, phoneNumber, createdAt) VALUES (?, ?, ?, ?, ?, ?)",
//       [profilePhoto, name, email, address, phoneNumber, timestamp]
//     );
//     return { success: true, message: "Customer Created Successfully" };
//   } catch (error: any) {
//     return { success: false, message: "Error creating customer" };
//   }
// };
export const createCustomers = async (
  db: SQLiteDatabase,
  { profilePhoto, name, email, phoneNumber, address, createdAt }: CustomerData
) => {
  try {
    const id = uuid.v4().toString(); // Convert to a string explicitly
    console.log(id, "uuid"); // Log the generated UUID

    const timestamp = createdAt || new Date().toISOString();

    // Use the previously generated UUID 'id' here
    await db.runAsync(
      "INSERT INTO customer (id, profilePhoto, name, email, address, phoneNumber, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [id, profilePhoto, name, email, address, phoneNumber, timestamp] // Use 'id' instead of generating a new one
    );

    console.log("Customer created successfully"); // Log success
    return { success: true, message: "Customer Created Successfully", id }; // Return the UUID for reference
  } catch (error: any) {
    console.error("Error creating customer: ", error); // Log the actual error
    return { success: false, message: "Error creating customer", error }; // Include error in the return
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
    const id = uuid.v4().toString(); // Convert to a string explicitly
    console.log(id, "uuid");
    const timestamp = createdAt || new Date().toISOString();
    await db.runAsync(
      "INSERT INTO cash_sell (id, customerId,saleAmount, collectedAmount, createdAt, dueAmount, extraAmount, description) VALUES (?,?, ?, ?, ?, ?, ?, ?)",
      [
        id,
        customerId,
        saleAmount,
        collectedAmount,
        timestamp,
        dueAmount,
        extraAmount,
        description,
      ]
    );
    return { success: true, message: "cash_sell created successfully" };
  } catch (error: any) {
    return { success: false, message: "cash_sell created successfully" };
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
    const id = uuid.v4().toString(); // Convert to a string explicitly
    const timestamp = createdAt || new Date().toISOString();
    await db.runAsync(
      "INSERT INTO due_collection (id, customerId, collectedAmount, createdAt, description) VALUES (?,?, ?, ?,?)",
      [id, customerId, collectedAmount, timestamp, description]
    );
    return { success: false, message: "due collection created successfully" };
  } catch (error: any) {
    return { success: false, message: "Error creating due collection" };
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
    const id = uuid.v4().toString(); // Convert to a string explicitly
    const timestamp = createdAt || new Date().toISOString();
    await db.runAsync(
      "INSERT INTO customer_lend (id, customerId, createdAt, amount, description) VALUES (?, ?, ?, ?, ?)",
      [id, customerId, timestamp, amount, description]
    );
    return { success: false, message: "customer lend created successfully" };
  } catch (error) {
    return { success: false, message: "Error creating customer lend" };
  }
};
export const customer_gave = async (
  db: SQLiteDatabase,
  { customerId, createdAt, amount, description }: lend
) => {
  try {
    const id = uuid.v4().toString(); // Convert to a string explicitly
    const timestamp = createdAt || new Date().toISOString();
    await db.runAsync(
      "INSERT INTO customer_gave (id, customerId, createdAt, amount, description) VALUES (?, ?, ?, ?, ?)",
      [id, customerId, timestamp, amount, description]
    );
    return { success: false, message: "customer gave created successfully" };
  } catch (error: any) {
    console.error("Error creating customer gave:", error);
    return { success: false, message: error.message };
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
    const id = uuid.v4().toString(); // Convert to a string explicitly
    const timestamp = createdAt || new Date().toISOString();

    // Check if a record with the same customerId and collectionDate already exists
    const existingRecord = await db.getFirstAsync(
      "SELECT * FROM collection_reminder WHERE customerId = ?",
      [customerId]
    );

    if (existingRecord) {
      return { success: false, message: "Record already exists" };
    }

    // Insert the new record
    await db.runAsync(
      "INSERT INTO collection_reminder (id, amount, customerId, createdAt, collectionDate) VALUES (?,?, ?, ?, ?)",
      [id, amount, customerId, timestamp, collectionDate]
    );

    return { success: true };
  } catch (error: any) {
    // Log the error with additional context
    console.error("Error creating collection_reminder:", {
      message: error.message,
      stack: error.stack,
    });

    // Handle specific errors differently
    if (error.message.includes("SQLITE_CONSTRAINT")) {
      return { success: false, message: "Database constraint error" };
    } else if (error.message.includes("network")) {
      return { success: false, message: "Network issue" };
    } else {
      return { success: false, message: "Unexpected error occurred" };
    }
  }
};

export const getCollectionReminderByCustomerId = async (
  db: SQLiteDatabase,
  customerId: number
) => {
  try {
    const results = await db.getAllAsync(
      "SELECT * FROM collection_reminder WHERE customerId = ?",
      [customerId]
    );
    return results;
  } catch (error) {
    console.error("Error fetching cash sells by customer ID:", error);
  }
};

export const updateDueAmount = async (
  db: SQLiteDatabase,
  {
    id,
    customerId,
    dueAmount,
  }: { id: number; customerId: number; dueAmount: number }
) => {
  try {
    if (id === undefined || customerId === undefined) {
      throw new Error("ID or customerId is undefined");
    }

    // Retrieve the current collectedAmount and dueAmount
    const result: any = await db.getAllAsync(
      "SELECT collectedAmount, dueAmount FROM cash_sell WHERE id = ? AND customerId = ?",
      [id, customerId]
    );

    if (!result || result.length === 0) {
      throw new Error("Record not found");
    }

    const currentCollectedAmount = Number(result[0]?.collectedAmount) || 0;
    const previousDueAmount = Number(result[0]?.dueAmount) || 0;

    // Calculate the new dueAmount and collectedAmount
    const validDueAmount = Number(dueAmount);
    const newDueAmount = previousDueAmount - validDueAmount;
    const newCollectedAmount = currentCollectedAmount + validDueAmount;

    // Update the dueAmount and collectedAmount
    await db.runAsync(
      "UPDATE cash_sell SET dueAmount = ?, collectedAmount = ? WHERE id = ? AND customerId = ?",
      [newDueAmount, newCollectedAmount, id, customerId]
    );
    return { success: true, message: "updated successfully" };
  } catch (error) {
    console.error("Error updating due amount and collected amount:", error);
    return {
      success: false,
      message: "Error updating due amount and collected amount",
    };
  }
};

export const updateSupplierDueAmount = async (
  db: SQLiteDatabase,
  {
    id,
    supplierId,
    dueAmount,
  }: { id: number; supplierId: number; dueAmount: number }
) => {
  try {
    if (id === undefined || supplierId === undefined) {
      throw new Error("ID or supplierId is undefined");
    }

    // Retrieve the current dueAmount
    const result: any = await db.getAllAsync(
      "SELECT dueAmount FROM cash_buy WHERE id = ? AND supplierId = ?",
      [id, supplierId]
    );

    if (!result || result?.length === 0) {
      throw new Error("Record not found");
    }
    const previousDueAmount = Number(result[0]?.dueAmount) || 0;
    const validDueAmount = Number(dueAmount);
    const newDueAmount = previousDueAmount - validDueAmount;

    // Update the dueAmount
    await db.runAsync(
      "UPDATE cash_buy SET dueAmount = ? WHERE id = ? AND supplierId = ?",
      [newDueAmount, id, supplierId]
    );
    return { success: true, message: "Due amount updated successfully" };
  } catch (error) {
    return {
      success: false,
      message: `Error updating due amount`,
    };
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
export const getGaveLendById = async (
  db: SQLiteDatabase,
  customerId: number
) => {
  return await db.getAllAsync(
    "SELECT * FROM customer_gave WHERE customerId = ?",
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
    return { success: true, message: "User deleted successfully" };
  } catch (error) {
    return {
      success: false,
      message: "Error deleting user",
    };
  }
};

export const getCollectionReminder = async (db: SQLiteDatabase) => {
  try {
    return await db.getAllAsync("SELECT * FROM collection_reminder");
  } catch {
    return [];
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
    const id = uuid.v4().toString(); // Convert to a string explicitly
    const timestamp = createdAt || new Date().toISOString();
    await db.runAsync(
      "INSERT INTO supplier (id, profilePhoto,name, email, phoneNumber, address, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [id, profilePhoto, name, email, phoneNumber, address, timestamp]
    );
    return { success: true, message: "Supplier created successfully" };
  } catch (error) {
    return { success: false, message: "Error creating supplier" };
  }
};

export const deleteSupplierById = async (
  db: SQLiteDatabase,
  userId: number
) => {
  try {
    await db.runAsync("DELETE FROM supplier WHERE id = ?", [userId]);
    return { success: true, message: "Supplier deleted successfully" };
  } catch (error) {
    return { success: false, message: "Error deleting supplier" };
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
    const id = uuid.v4().toString(); // Convert to a string explicitly
    const timestamp = createdAt || new Date().toISOString();
    await db.runAsync(
      "INSERT INTO cash_buy (id, supplierId, amount, createdAt, description, collectedAmount, dueAmount, extraAmount) VALUES (?, ?, ?, ?, ?, ?,?, ?)",
      [
        id,
        supplierId,
        amount,
        timestamp,
        description,
        collectedAmount,
        dueAmount,
        extraAmount,
      ]
    );
    return { success: true, message: "cash buy created successfully" };
  } catch (error) {
    return { success: false, message: "Error creating cash buy" };
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
    const id = uuid.v4().toString(); // Convert to a string explicitly
    const timestamp = createdAt || new Date().toISOString();
    await db.runAsync(
      "INSERT INTO due_collection (id,  createdAt, amount, description) VALUES (?, ?, ?, ?)",
      [id, timestamp, amount, description]
    );
    return { success: true, message: "supplier lend created successfully" };
  } catch (error) {
    return { success: false, message: "Error creating cash_sell" };
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
  {
    profilePhoto,
    name,
    email,
    address,
    phoneNumber,
    taxNumber,
  }: OwnerProfileData
) => {
  try {
    const id = uuid.v4().toString(); // Convert to a string explicitly
    // const timestamp = createdAt || new Date().toISOString();
    await db.runAsync(
      "INSERT INTO owner_profile (id, profilePhoto, name, email, address, phoneNumber, taxNumber) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [id, profilePhoto, name, email, address, phoneNumber, taxNumber]
    );
    return { success: true, message: "owner profile Created Successfully" };
  } catch (error) {
    return { success: false, message: "Error creating owner profile" };
  }
};

export const update_owner_profile = async (
  db: SQLiteDatabase,
  {
    id,
    name,
    email,
    address,
    phoneNumber,
    taxNumber,
    profilePhoto,
  }: UpdateOwnerProfile
) => {
  try {
    if (id === undefined) {
      throw new Error("ID is undefined");
    }
    await db.runAsync(
      "UPDATE owner_profile SET profilePhoto = ?, name = ?, email = ?, address = ?, phoneNumber = ?, taxNumber = ? WHERE id = ?",
      [profilePhoto, name, email, address, phoneNumber, taxNumber, id]
    );
    return { success: true, message: "owner profile updated successfully" };
  } catch (error) {
    return { success: false, message: "Error updating owner profile" };
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
  { date, totalCash }: CashReportData
) => {
  try {
    const id = uuid.v4().toString(); // Convert to a string explicitly
    const timestamp = date || new Date().toISOString();
    await db.runAsync(
      "INSERT INTO cash_report (id, date, totalCash) VALUES (?, ?, ?)",
      [id, timestamp, totalCash]
    );
    return { success: true, message: "cash report created successfully" };
  } catch (error) {
    return { success: false, message: "Error creating cash report" };
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
    const id = uuid.v4().toString(); // Convert to a string explicitly
    const timestamp = createdAt || new Date().toISOString();
    await db.runAsync(
      "INSERT INTO expense (id, amount, createdAt, description) VALUES (?, ?, ?, ?)",
      [id, amount, timestamp, description]
    );
    return { success: true, message: "expense created successfully" };
  } catch (error) {
    return { success: false, message: "Error creating expense" };
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
    const id = uuid.v4().toString(); // Convert to a string explicitly
    const timestamp = createdAt || new Date().toISOString();
    await db.runAsync(
      "INSERT INTO deposit (id, amount, createdAt, description) VALUES (?, ?, ?, ?)",
      [id, amount, timestamp, description]
    );
    return { success: true, message: "deposit created successfully" };
  } catch (error) {
    return { success: false, message: "Error creating deposit" };
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
    const id = uuid.v4().toString(); // Convert to a string explicitly
    const timestamp = createdAt || new Date().toISOString();
    await db.runAsync(
      "INSERT INTO withdraw (id, amount ,createdAt, description) VALUES (?, ?, ?, ?)",
      [id, amount, timestamp, description]
    );
    return { success: true, message: "withdraw created successfully" };
  } catch (error) {
    console.error("Error creating customer: ", error);
    return { success: false, message: "Error creating withdraw" };
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

export const getCashReport = async (db: SQLiteDatabase) => {
  return await db.getAllAsync("SELECT * FROM cash_report");
};

//=================  ====================
//=================  ====================

// =====================================================================================================
// =====================================================================================================

// =======================================================
// ============= types are start from here ===============
// =======================================================

export interface CustomerData {
  profile_photo: string;
  name: string;
  email: string;
  address: string;
  phone: string;
  createdAt?: string;
}

export interface SupplierData {
  profile_photo: string;
  name: string;

  store_name: string;

  email: string;
  address: string;
  phone: string;
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
  date?: string;
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

export interface UpdateOwnerProfile {
  id: number;
  name: string;
  email: string;
  address: string;
  phoneNumber: number;
  taxNumber: number;
  profilePhoto: string;
}
