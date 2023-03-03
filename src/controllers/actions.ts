// import {getFromStorage, saveToStorage} from './localStorage';

import {getUserByEmail} from './firebaseFirestore';
import {getFromStorage, saveToStorage} from './localStorage';

// export const addContactList = async (uid: string, contactId: string) => {
//   try {
//     const oldContactList = await getFromStorage('contactList');
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
export const addContact = async (email: string) => {
  try {
    const newContact = await getUserByEmail(email);
    if (newContact) {
      const oldContactList = await getFromStorage('contactList');
      if (oldContactList) {
        const newContactList = [...oldContactList, newContact];
        await saveToStorage('contactList', newContactList);
      } else {
        await saveToStorage('contactList', [newContact]);
      }
      return newContact;
    } else {
      return null;
    }
    // if (contactUid) {
    //   const oldContactList = await getFromStorage('contactList');
    //   const newContactList = [...oldContactList, contactUid];
    //   saveToStorage('contactList', newContactList);
    //   setFieldUser(uid, UsersFieldsType.contacts, newContactList);
    // } else if (contactUid) {
    //   saveToStorage('contactList', [contactUid]);
    //   setFieldUser(uid, UsersFieldsType.contacts, [contactUid]);
    // } else {
    //   return null;
    // }
  } catch (error) {
    console.log('Location: Controllers/actions addContact() ', error);
  }
};
