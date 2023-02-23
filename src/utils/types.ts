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
  status?: boolean;
  lastTime?: {
    message: string;
    date: string;
  };
}

export interface UserType {
  email: string;
  name: string;
  pic: string;
  username: string;
}

export enum UsersFieldsType {
  email = 'email',
  name = 'name',
  pic = 'pic,',
  username = 'username',
  contacts = 'contacts',
}
