export interface MessageType {
  id: string;
  senderId: string;
  recipentId: string;
  date: Date;
  message?: string;
}

export interface ConversationType {
  id: string;
  messages: MessageType[];
}
