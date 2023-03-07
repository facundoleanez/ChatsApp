/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
import messaging from '@react-native-firebase/messaging';

// Request permission for receiving notifications
messaging().requestPermission();

// Handle background notification messages
messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Background Notification Message:', remoteMessage);
});

AppRegistry.registerComponent(appName, () => App);
