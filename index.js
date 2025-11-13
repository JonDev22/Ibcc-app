/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import TrackPlayer from 'react-native-track-player';
import playerService from './src/utils/playerService';
import { getApp } from '@react-native-firebase/app';
import {
    getMessaging,
    setBackgroundMessageHandler,
} from '@react-native-firebase/messaging';

const messaging = getMessaging(getApp());
setBackgroundMessageHandler(messaging, async remoteMessage => {
    console.log('Background Message Handler:', {
        title: remoteMessage.notification?.title,
        body: remoteMessage.notification?.body,
        data: remoteMessage.data,
    });
    
    // iOS will display the notification automatically if it has title/body
    // This handler is mainly for logging and any additional processing
});

AppRegistry.registerComponent(appName, () => App);
TrackPlayer.registerPlaybackService(() => playerService);
