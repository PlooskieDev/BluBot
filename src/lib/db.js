import { DatabaseSync } from 'node:sqlite'
import { mkdirSync } from 'node:fs'

const dataDir = new URL('../../data/', import.meta.url)
mkdirSync(dataDir, { recursive: true })

export const db = new DatabaseSync(new URL('blubot.db', dataDir))

// WAL lets the IDE read the database while the bot is writing to it
db.exec('PRAGMA journal_mode = WAL')

db.exec(`
    CREATE TABLE IF NOT EXISTS seen_listings (
        url           TEXT PRIMARY KEY,
        title         TEXT NOT NULL,
        price         TEXT,
        posted_at     TEXT,
        first_seen_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    )
`)
