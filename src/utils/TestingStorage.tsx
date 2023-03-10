//This component is just for testing propuse

import {View, Text} from 'react-native';
import React from 'react';
import {Button} from 'react-native-paper';
import {
  getAllKeysConver,
  getFromStorage,
  removeConversationFromStorage,
  saveToStorage,
  clearAll,
} from '../controllers/localStorage';
import {contactsList} from './constants';
import styled from 'styled-components/native';
import {getUserByEmail} from '../controllers/firebaseFirestore';

const ButtonTrigger = styled.TouchableOpacity`
  height: 100px;
  width: 100px;
  background-color: #bb4550;
  border-radius: 50px;
  align-items: center;
  justify-content: center;
  align-self: center;
`;

const TestingStorage = () => {
  const handlePressSave = () => {
    console.log('saved');
    const algo = saveToStorage('contacts', contactsList);
    console.log(algo);
  };
  const handlePressGet = async () => {
    const algo = await getFromStorage('contactList');
    console.log(algo);
  };

  const handlePressDel = async () => {
    console.log('got');
    const algo = await removeConversationFromStorage('128');
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
  const handleTriggerPress = () => {
    getUserByEmail('caca');
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
      <ButtonTrigger onPress={handleTriggerPress}>
        <Text>Trigger</Text>
      </ButtonTrigger>
    </View>
  );
};

export default TestingStorage;
