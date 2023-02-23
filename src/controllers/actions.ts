// import {getDataLocal, storeDataLocal} from './localStorage';

import {UsersFieldsType} from '../utils/types';
import {
  getUserIdByEmail,
  //   getUserIdByUsername,
  setFieldUser,
} from './firebaseFirestore';
import {getDataLocal, storeDataLocal} from './localStorage';

// export const addContactList = async (uid: string, contactId: string) => {
//   try {
//     const oldContactList = await getDataLocal('contactList');
//     if (oldContactList) {
//       console.log(oldContactList);
//       const newList: string[] = oldContactList.push(contactId);
//       storeData('contactList', newList);
//       addContact(uid, newList);
//       console.log(newList);
//     } else {
//       storeData('contactList', [uid]);
//     }
//   } catch (error) {
//     console.log(error);
//   }
// };
export const addContact = async (
  uid: string,
  email: string,
  //   username?: string,
) => {
  try {
    const oldContactList = await getDataLocal('contactList');
    console.log(oldContactList);
    const contactUid = await getUserIdByEmail(email);
    console.log(contactUid);

    if (oldContactList && contactUid) {
      const newContactList = [...oldContactList, contactUid];
      storeDataLocal('contactList', newContactList);
      setFieldUser(uid, UsersFieldsType.contacts, newContactList);
    } else if (contactUid) {
      storeDataLocal('contactList', [contactUid]);
      setFieldUser(uid, UsersFieldsType.contacts, [contactUid]);
    }
  } catch (error) {
    console.log(error);
  }
};
