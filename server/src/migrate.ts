import "dotenv/config";
import { pool } from "./db";
const sql = `CREATE EXTENSION IF NOT EXISTS pgcrypto;
CREATE TABLE IF NOT EXISTS tasks (id uuid PRIMARY KEY, title text NOT NULL, due_date text, priority text NOT NULL DEFAULT 'medium' CHECK (priority IN ('low','medium','high')), completed boolean NOT NULL DEFAULT false, category text NOT NULL DEFAULT '收件箱', created_at timestamptz NOT NULL DEFAULT now(), updated_at timestamptz NOT NULL DEFAULT now());
CREATE INDEX IF NOT EXISTS tasks_due_date_idx ON tasks(due_date);
CREATE TABLE IF NOT EXISTS plans (id uuid PRIMARY KEY, title text NOT NULL, date text NOT NULL, notes text, created_at timestamptz NOT NULL DEFAULT now());
CREATE TABLE IF NOT EXISTS reflections (id uuid PRIMARY KEY, period text NOT NULL, date text NOT NULL, content text NOT NULL, metrics jsonb, created_at timestamptz NOT NULL DEFAULT now());`;
try { await pool.query(sql); console.log("Database migrations completed."); } finally { await pool.end(); }
