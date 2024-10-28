import { Pool } from "pg";
import "dotenv/config";

const connection = {
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: Number(process.env.PGPORT),
};

const pool = new Pool(connection);
async function main() {

  console.log("The provided connection details are:")		
  console.log({
    hostname: connection.host,
    user: connection.user,
    database: connection.database,
	port: connection.port
  });

  try {
    const db = await pool.connect();
    const wal = await db.query("SHOW wal_level");
    if (wal.rows[0].wal_level != "logical") {
      await db.query("ALTER SYSTEM SET wal_level = logical");
      // Unless you have a reason for a different configuration,
      // `max_replication_slots` and `max_wal_senders` should have
      // the same value
      await db.query("ALTER SYSTEM SET max_replication_slots = 20");
      await db.query("ALTER SYSTEM SET max_wal_senders = 20");
      await db.query("ALTER SYSTEM SET wal_keep_size = 2048");
      await db.query("SELECT pg_reload_conf()");
      console.log(
        "All done please restart the database and delete this service."
      );
	  console.log(`Use the following DATABASE_URL to enable Prisma Pulse:\n\n${process.env.DATABASE_URL}?sslmode=disable`);
      return;
    }

    console.log("DB is already configured\n");
	console.log(`Use the following DATABASE_URL to enable Prisma Pulse:\n\n${process.env.DATABASE_URL}?sslmode=disable`);
  } catch (err) {
    console.log(err);
  }
}

main()
  .then(() => {
    pool.end();
    console.log("\nDb config script complete");
  })
  .catch((err) => {
    pool.end();
    console.log(err);
  });
