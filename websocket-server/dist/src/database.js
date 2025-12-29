"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pool = void 0;
exports.query = query;
exports.saveMessage = saveMessage;
exports.getRecentMessages = getRecentMessages;
exports.getPseudonymForIP = getPseudonymForIP;
exports.savePseudonymForIP = savePseudonymForIP;
exports.testConnection = testConnection;
const pg_1 = require("pg");
exports.pool = new pg_1.Pool({
    connectionString: process.env.DATABASE_URL,
    max: 10,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
});
exports.pool.on("error", (err) => {
    console.error("Unexpected error on idle client", err);
});
async function query(text, params) {
    const start = Date.now();
    try {
        const result = await exports.pool.query(text, params);
        const duration = Date.now() - start;
        console.log("Executed query", { text, duration, rows: result.rowCount });
        return result;
    }
    catch (error) {
        console.error("Database query error:", { text, error });
        throw error;
    }
}
async function saveMessage(anonymousUserId, message, pseudonym, ipHash) {
    const result = await query(`INSERT INTO chat_messages (anonymous_user_id, pseudonym, message, ip_hash, timestamp)
     VALUES ($1, $2, $3, $4, NOW())
     RETURNING id, anonymous_user_id, pseudonym, message, timestamp`, [anonymousUserId, pseudonym, message, ipHash || null]);
    if (!result.rows[0]) {
        throw new Error("Failed to save message");
    }
    const row = result.rows[0];
    return {
        id: row.id,
        anonymous_user_id: row.anonymous_user_id,
        pseudonym: row.pseudonym,
        message: row.message,
        timestamp: new Date(row.timestamp),
    };
}
async function getRecentMessages(limit = 100) {
    const result = await query(`SELECT id, anonymous_user_id, pseudonym, message, timestamp
     FROM chat_messages
     ORDER BY timestamp DESC
     LIMIT $1`, [limit]);
    // Reverse to get oldest first
    const messages = result.rows
        .reverse()
        .map((row) => ({
        id: row.id,
        anonymous_user_id: row.anonymous_user_id,
        pseudonym: row.pseudonym || `anon-${row.anonymous_user_id.substring(0, 6)}`,
        message: row.message,
        timestamp: new Date(row.timestamp),
    }));
    return messages;
}
async function getPseudonymForIP(ipHash) {
    const result = await query(`SELECT pseudonym FROM user_pseudonyms WHERE ip_hash = $1`, [ipHash]);
    return result.rows[0]?.pseudonym || null;
}
async function savePseudonymForIP(ipHash, pseudonym) {
    await query(`INSERT INTO user_pseudonyms (ip_hash, pseudonym) VALUES ($1, $2)
     ON CONFLICT (ip_hash) DO NOTHING`, [ipHash, pseudonym]);
}
async function testConnection() {
    try {
        await query("SELECT NOW()");
        return true;
    }
    catch (error) {
        console.error("Database connection test failed:", error);
        return false;
    }
}
//# sourceMappingURL=database.js.map