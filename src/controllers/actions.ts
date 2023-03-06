import {
  createUserDoc,
  deleteOldDeviceToken,
  getUserByEmail,
  setFieldUser,
} from './firebaseFirestore';
import {getFromStorage, saveToStorage} from './localStorage';
import messaging from '@react-native-firebase/messaging';
import {UsersFieldsType} from '../utils/types';
import {createAuthUser} from './firebaseAuth';

export const createAccountWithEmailAndPassword = async (
  email: string,
  password: string,
) => {
  try {
    const res = await createAuthUser(email, password);
    if (res) {
      console.log('User account created & signed in! with UID: ', res);
      await createUserDoc(res, email);
      getDeviceTokenLog(res);
    }
  } catch (error) {
    console.log(
      'Location: controllers/actions createAccountWithEmailAndPassword()',
      error,
    );
  }
};

export const addContact = async (email: string) => {
  try {
    const newContact = await getUserByEmail(email);
    if (!newContact) {
      return null;
    }
    const oldContactList = await getFromStorage('contactList');
    await saveToStorage(
      'contactList',
      oldContactList ? [...oldContactList, newContact] : [newContact],
    );
    return newContact;
  } catch (error) {
    console.log('Location: Controllers/actions addContact() ', error);
  }
};

export const getDeviceTokenLog = async (uid: string) => {
  try {
    await messaging().registerDeviceForRemoteMessages();
    const token = await messaging().getToken();
    await deleteOldDeviceToken(JSON.stringify(token));
    setFieldUser(uid, UsersFieldsType.DeviceToken, token);
  } catch (error) {
    console.log('Location: controllers/actions getDeviceToken()', error);
  }
};
