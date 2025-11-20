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
    console.log('🔔 Background Notification Received:', {
        title: remoteMessage.notification?.title,
        body: remoteMessage.notification?.body,
        data: remoteMessage.data,
    });

    // iOS will automatically display notifications with title/body in the notification center
    // This handler runs when app is closed or in background
    // Return a promise to indicate handling is complete
    return Promise.resolve();
});

AppRegistry.registerComponent(appName, () => App);
TrackPlayer.registerPlaybackService(() => playerService);
