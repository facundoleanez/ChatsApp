export interface ConversationType {
  id: string;
  messages: MessageType[];
}

// States that renders screens
export interface ConversType {
  uid: string;
  name: string;
  pic?: string;
  lastMessage: string;
  lastTime: string;
}

export interface MessageType {
  date: Date;
  senderId: string;
  recipentId: string;
  message?: string;
}

export interface ContactType {
  uid: string;
  name: string;
  pic?: string;
}
