import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import Icons from 'react-native-vector-icons/Feather';
import Convers from '../screens/Convers';
import Chat from '../screens/Chat';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {useTheme} from 'styled-components/native';

export type RootTabParamList = {
  Conversations: undefined;
  Chat: undefined;
  Login: undefined;
  Signup: undefined;
};

const TabNavergator = () => {
  const theme = useTheme();
  const Tab = createMaterialBottomTabNavigator<RootTabParamList>();

  return (
    <Tab.Navigator
      initialRouteName="Conversations"
      barStyle={{backgroundColor: theme.colors.primaryBackground}}
      activeColor={theme.colors.tertiary}
      inactiveColor={theme.colors.secondary}
      labeled={false}>
      <Tab.Screen
        name="Conversations"
        component={Convers}
        options={{
          tabBarIcon: ({color}) => (
            <Icon name="people" size={30} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Chat"
        component={Chat}
        options={{
          tabBarIcon: ({color}) => (
            <Icons name="message-circle" size={30} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavergator;
