import { Pool, QueryResult } from "pg";
import { ChatMessage } from "./types";
export declare const pool: Pool;
export declare function query(text: string, params?: any[]): Promise<QueryResult>;
export declare function saveMessage(anonymousUserId: string, message: string, pseudonym: string, ipHash?: string): Promise<ChatMessage>;
export declare function getRecentMessages(limit?: number): Promise<ChatMessage[]>;
export declare function getPseudonymForIP(ipHash: string): Promise<string | null>;
export declare function savePseudonymForIP(ipHash: string, pseudonym: string): Promise<void>;
export declare function testConnection(): Promise<boolean>;
//# sourceMappingURL=database.d.ts.map