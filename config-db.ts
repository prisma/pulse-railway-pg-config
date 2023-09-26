import { Pool } from "pg";

const connection = {
	user: process.env.PGUSER,
	host: process.env.PGHOST,
	database: process.env.PGDATABASE,
	password: process.env.PGPASSWORD,
	port: Number(process.env.PGPORT),
};
const pool = new Pool(connection);
async function main() {
	try {
		const db = await pool.connect();
		const wal = await db.query("SHOW wal_level");
		if (wal.rows[0].wal_level != "logical") {
			await db.query("DROP EXTENSION IF EXISTS timescaledb");
			await db.query("ALTER SYSTEM SET wal_level = logical");
			await db.query("ALTER SYSTEM SET max_replication_slots = 20");
			await db.query("ALTER SYSTEM SET wal_keep_size = 2048");
			await db.query("SELECT pg_reload_conf()");
			console.log(
				"All done please restart the database and delete this service."
			);
			console.log("Here is the DATABASE_URL", process.env.DATABASE_URL);
			return;
		}
		console.log("DB is already configured");
	} catch (err) {
		console.log(err);
	}
}

main()
	.then(() => {
		pool.end();
		console.log("Db config script complete");
	})
	.catch((err) => {
		pool.end();
		console.log(err);
	});
