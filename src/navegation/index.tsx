import React, {useContext, useMemo} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import Icons from 'react-native-vector-icons/Feather';
import Convers from '../screens/Convers';
import Chat from '../screens/Chat';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {useTheme} from 'styled-components/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LogIn from '../screens/LogIn';
import SignUp from '../screens/SignUp';
import {GlobalContext} from '../App';
import TopBar from './TopBar';
import Contacts from '../screens/Contacts';

export type RootTabParamList = {
  Conversations: undefined;
  Chat: undefined;
  Login: undefined;
  Signup: undefined;
  Contacts: undefined;
};

const TabNavergator = () => {
  const context = useContext(GlobalContext);
  const uid = useMemo(() => context?.context.uid, [context]);
  const theme = useTheme();
  const Tab = createMaterialBottomTabNavigator<RootTabParamList>();
  const Stack = createNativeStackNavigator<RootTabParamList>();
  return (
    <>
      {uid ? (
        <>
          <TopBar />
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
                  <Icon name="chatbubbles-outline" size={30} color={color} />
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
            <Tab.Screen
              name="Contacts"
              component={Contacts}
              options={{
                tabBarIcon: ({color}) => (
                  <Icon name="people-outline" size={30} color={color} />
                ),
              }}
            />
          </Tab.Navigator>
        </>
      ) : (
        <>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}>
            <Stack.Screen name="Login" component={LogIn} />
            <Stack.Screen name="Signup" component={SignUp} />
          </Stack.Navigator>
        </>
      )}
    </>
  );
};

export default TabNavergator;
