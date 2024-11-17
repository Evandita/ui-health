import { Pool } from "pg";

const pool = new Pool ({
  host: "ep-square-grass-a1n4godm.ap-southeast-1.aws.neon.tech",
  port: "5432",
  user: "neondb_owner",
  password: "d6T4rKNiRxwA",
  database: "neondb",
  ssl: true
});

export default pool;