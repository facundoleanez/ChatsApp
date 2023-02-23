import {View, Text} from 'react-native';
import React from 'react';
import {Button} from 'react-native-paper';
import {
  getAllKeysConver,
  getDataLocal,
  removeConversationLocal,
  storeDataLocal,
  clearAll,
} from '../controllers/localStorage';
import {contactsList} from './constants';

const TestingStorage = () => {
  const handlePressSave = () => {
    console.log('saved');
    const algo = storeDataLocal('contacts', contactsList);
    console.log(algo);
  };
  const handlePressGet = async () => {
    const algo = await getDataLocal('contactList');
    console.log(algo);
  };

  const handlePressDel = async () => {
    console.log('got');
    const algo = await removeConversationLocal('128');
    console.log(algo);
  };
  const handlePressGetAll = async () => {
    console.log('got');
    const algo = await getAllKeysConver();
    console.log(algo);
  };
  const handlePressWipeData = async () => {
    console.log('deleted');
    const algo = await clearAll();
    console.log(algo);
  };
  return (
    <View>
      <Button onPress={handlePressSave}>
        <Text>save</Text>
      </Button>
      <Button onPress={handlePressGet}>
        <Text>get</Text>
      </Button>
      <Button onPress={handlePressDel}>
        <Text>delete</Text>
      </Button>
      <Button onPress={handlePressGetAll}>
        <Text>getAll</Text>
      </Button>
      <Button onPress={handlePressWipeData}>
        <Text>Wipe Data</Text>
      </Button>
    </View>
  );
};

export default TestingStorage;
