import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeData = async (key:string, value:any) => {
  try {
    const jsonValue = JSON.stringify(value);
    const res = await AsyncStorage.setItem(key, jsonValue);
    return res
  } catch (e) {
    return e
    // saving error
  }
};
export const createConv = async (key:string, value:any) => {
  try {
    const jsonValue = JSON.stringify(value);
    const res = await AsyncStorage.setItem(key, jsonValue);
    return res
  } catch (e) {
    return e
    // saving error
  }
};

export const getData = async (storageKey:string) => {
  try {
    const jsonValue = await AsyncStorage.getItem(storageKey);
    console.log(jsonValue != null ? JSON.parse(jsonValue) : null)
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    return e
  }
};

export const removeConversation =async (converKey:string) => {
  try {
    const res = await AsyncStorage.removeItem(converKey)
    console.log('removed'+ res)
  } catch(e){
    return e
  }
}
export const getAllKeysConver =async () => {
  let keys: readonly string[] = []
  try {
    keys = await AsyncStorage.getAllKeys()
    return keys
  } catch (e) {
    return e
  }
}