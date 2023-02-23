import firestore from '@react-native-firebase/firestore';
import {UsersFieldsType} from '../utils/types';

//Returns uid or null depending if email or username exist
export const getUserIdByEmail = async (email: string) => {
  try {
    const res = await firestore()
      .collection('Users')
      .where('email', '==', email)
      .limit(1)
      .get();
    if (res.docs[0]) {
      return res.docs[0].id;
    } else {
      return null;
    }
  } catch (error) {
    console.error(error);
    return null;
  }
};
export const getUserIdByUsername = async (username: string) => {
  try {
    const res = await firestore()
      .collection('Users')
      .where('username', '==', username)
      .limit(1)
      .get();
    if (res.docs[0]) {
      return res.docs[0].id;
    } else {
      return null;
    }
  } catch (error) {
    console.error(error);
    return null;
  }
};

//Creates an User document in Users Collections and return the response or null
export const createUserDoc = async (
  uid: string,
  email: string,
  name?: string,
  pic?: string,
  username?: string,
) => {
  try {
    const res = await firestore()
      .collection('Users')
      .doc(uid)
      .set({
        email: email,
        name: name || '',
        pic: pic || '',
        username: username || '',
      });
    return res;
  } catch (error) {
    console.log(error);
    return null;
  }
};

//set algun campo of any user
export const setFieldUser = async (
  uid: string,
  field: UsersFieldsType,
  value: any,
) => {
  try {
    const res = await firestore()
      .collection('Users')
      .doc(uid)
      .update({
        [field]: JSON.stringify(value),
      });
    return res;
  } catch (error) {
    console.log(error);
    return null;
  }
};
