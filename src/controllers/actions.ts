import {getUserByEmail} from './firebaseFirestore';
import {getFromStorage, saveToStorage} from './localStorage';

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
