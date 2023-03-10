import AsyncStorage from '@react-native-async-storage/async-storage';
import {ContactType} from '../utils/types';

export const saveToStorage = async (key: string, value: any) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
    console.log('StoreLocalData() Called with key: ' + key);
  } catch (e) {
    console.log(e);
    return e;
  }
};

export const getFromStorage = async (storageKey: string) => {
  try {
    const jsonValue = await AsyncStorage.getItem(storageKey);
    console.log('GetLocalData() Called with key: ' + storageKey);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.log(e);
    return null;
  }
};

export const removeConversationFromStorage = async (converKey: string) => {
  try {
    const res = await AsyncStorage.removeItem(converKey);
    return res;
  } catch (e) {
    console.log(e);
    return null;
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

export const clearAll = async () => {
  try {
    await AsyncStorage.clear();
  } catch (e) {
    console.log(e);
  }
  console.log('Done.');
};

export const deleteLastMessageContacts = async (uid: string) => {
  const contacts: ContactType[] = await getFromStorage('contacts');
  const newContacts = contacts.map(contact => {
    if (contact.uid === uid) {
      delete contact.lastTime;
      return contact;
    }
    return contact;
  });
  saveToStorage('contacts', newContacts);
};
