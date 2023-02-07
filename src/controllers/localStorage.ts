import AsyncStorage from '@react-native-async-storage/async-storage';
import {MessageType} from '../utils/types';

export const storeData = async (key: string, value: any) => {
  try {
    const jsonValue = JSON.stringify(value);
    const res = await AsyncStorage.setItem(key, jsonValue);
    return res;
  } catch (e) {
    return e;
    // saving error
  }
};
export const createConv = async (key: string, value: any) => {
  try {
    const jsonValue = JSON.stringify(value);
    const res = await AsyncStorage.setItem(key, jsonValue);
    return res;
  } catch (e) {
    return e;
    // saving error
  }
};

export const getData = async (storageKey: string) => {
  try {
    const jsonValue = await AsyncStorage.getItem(storageKey);
    console.log(
      'getData() Called with key:' +
        storageKey +
        (jsonValue != null ? JSON.parse(jsonValue) : null),
    );
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    return e;
  }
};

export const removeConversation = async (converKey: string) => {
  try {
    const res = await AsyncStorage.removeItem(converKey);
    console.log('removed conversation key:' + converKey + res);
  } catch (e) {
    return e;
  }
};
export const getAllKeysConver = async () => {
  let keys: readonly string[] = [];
  try {
    keys = await AsyncStorage.getAllKeys();
    return keys;
  } catch (e) {
    return e;
  }
};

export const sendMessageMerge = async (
  uid: string,
  contactId: string,
  message: string,
) => {
  const messages: MessageType[] = [
    {
      date: new Date(),
      senderId: uid,
      recipentId: contactId,
      message: message,
    },
  ];
  try {
    const jsonValue = JSON.stringify(messages);
    const res = await AsyncStorage.setItem(contactId, jsonValue);
    console.log(
      'sendMessageMerge() Called with key:' +
        contactId +
        (res != null ? JSON.parse(res) : null),
    );
    return res != null ? JSON.parse(res) : null;
  } catch (e) {
    console.log(e);
    return e;
  }
};
