export interface ChatMessage {
  id: number;
  anonymous_user_id: string;
  pseudonym: string;
  message: string;
  timestamp: Date;
}

export interface WSMessage {
  type: "message" | "history" | "error" | "connection" | "click_update";
  payload?: any;
  error?: string;
}

export interface ClientMessage {
  type: "send_message" | "request_history" | "click";
  payload: {
    userId?: string;
    message?: string;
  };
}

export interface ConnectionMetadata {
  userId: string;
  connectedAt: Date;
}
