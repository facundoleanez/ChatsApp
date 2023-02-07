import {View, Text} from 'react-native';
import React from 'react';
import {Button} from 'react-native-paper';
import {
  getAllKeysConver,
  getData,
  removeConversation,
  storeData,
} from '../controllers/localStorage';
import {contactsList} from './constants';

const TestingStorage = () => {
  const handlePressSave = () => {
    console.log('saved');
    const algo = storeData('contacts', contactsList);
    console.log(algo);
  };
  const handlePressGet = async () => {
    console.log('got');
    const algo = await getData('125');
    console.log(algo);
  };

  const handlePressDel = async () => {
    console.log('got');
    const algo = await removeConversation('125');
    console.log(algo);
  };
  const handlePressGetAll = async () => {
    console.log('got');
    const algo = await getAllKeysConver();
    console.log(algo);
  };
  return (
    <View>
      <Text>TestingStorage</Text>
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
    </View>
  );
};

export default TestingStorage;
