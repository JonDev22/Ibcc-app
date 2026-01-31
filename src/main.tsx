import getTabIcon from './functions/getTabIcon';
import { FontAwesome } from '@react-native-vector-icons/fontawesome';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeStack from './tabs/home/HomeStack';
import { Color } from './theme/colors';
import ResourcesStack from './tabs/resources/ResourcesStack';
import AudioStack from './tabs/audio/AudioStack';
import ChurchLifeStack from './tabs/churchLife/ChurchLifeStack';
import useColorMap from './hooks/useColorMap';
import SettingsView from './tabs/settings/SettingsView';
import {
    FirebaseAuthTypes,
    getAuth,
    onAuthStateChanged,
} from '@react-native-firebase/auth';
import userSettings from './storage/userSettings';
import { useEffect, useState } from 'react';
import {
    AuthorizationStatus,
    getMessaging,
    getToken,
    onMessage,
    requestPermission,
    registerDeviceForRemoteMessages,
    subscribeToTopic,
} from '@react-native-firebase/messaging';
import { Alert, Platform, PermissionsAndroid } from 'react-native';
import { getApp } from '@react-native-firebase/app';
import getUserFromDatabase from './functions/database/getUserFromDatabase';

const Tab = createBottomTabNavigator();

const renderTabBarIcon = (routeName: string, color: Color) => (props: any) => {
    const name = getTabIcon(routeName);
    return <FontAwesome name={name} {...props} color={color} />;
};

function Main() {
    const colorMap = useColorMap();
    const { setUser, removeUser } = userSettings();
    const [tempUser, setTempUser] = useState<FirebaseAuthTypes.User | null>(
        null,
    );

    const fetchAndSetUser = async (userInput: FirebaseAuthTypes.User) => {
        const databaseUser = await getUserFromDatabase(userInput);
        setUser(databaseUser);
    }

    useEffect(() => {
        const auth = getAuth();
        const authStateSetup = onAuthStateChanged(auth, user => {
            if (user?.uid) {
                setTempUser(user);
            } else {
                setTempUser(null);
            }
        });

        return () => {
            authStateSetup();
        };
    }, [setTempUser]);

    // Necessary effect call - Seemingly obsolete, but setting the user in onAuthStateChanged method causes the app to rerender forever. To prevent this, an extra state for this component needed to be set.
    useEffect(() => {
        if (tempUser?.email) {
            fetchAndSetUser(tempUser);
        } else {
            removeUser();
        }
    }, [removeUser, setUser, tempUser]);

    useEffect(() => {
        const app = getApp();
        const messagingInstance = getMessaging(app);

        const setupFCM = async () => {
            try {
                if (Platform.OS === 'ios') {
                    // Ensure the native side registers device for remote messages (APNs)
                    try {
                        await registerDeviceForRemoteMessages(messagingInstance);
                    } catch (regErr) {
                        console.warn('registerDeviceForRemoteMessages error', regErr);
                    }

                    const authStatus =
                        await requestPermission(messagingInstance);
                    const enable =
                        authStatus === AuthorizationStatus.AUTHORIZED ||
                        authStatus === AuthorizationStatus.PROVISIONAL;

                    if (!enable) {
                        console.log('iOS: notification permission not granted');
                        return;
                    }
                } else if (Platform.OS === 'android') {
                    // Request POST_NOTIFICATIONS for Android 13+
                    try {
                        const sdkInt = Platform.Version as number;
                        if (sdkInt >= 33) {
                            const granted = await PermissionsAndroid.request(
                                PermissionsAndroid.PERMISSIONS
                                    .POST_NOTIFICATIONS,
                            );
                            if (
                                granted !== PermissionsAndroid.RESULTS.GRANTED
                            ) {
                                console.log(
                                    'Android: POST_NOTIFICATIONS not granted',
                                );
                                // We continue to get token but notifications won't be shown
                            }
                        }
                    } catch (permErr) {
                        console.warn(
                            'Error requesting Android notification permission',
                            permErr,
                        );
                    }
                }

                const token = await getToken(messagingInstance);
                // console.log('FCM token:', token);

                // Subscribe to topics if a token exists
                if (token) {
                    try {
                        await subscribeToTopic(messagingInstance, 'events');
                        await subscribeToTopic(
                            messagingInstance,
                            'announcements',
                        );
                        await subscribeToTopic(messagingInstance, 'audios');
                        await subscribeToTopic(messagingInstance, 'tbtAtHome');
                    } catch (topicErr) {
                        console.warn('Subscribe to topic failed', topicErr);
                    }
                } else {
                    console.warn(
                        'No FCM token available; skipping topic subscription',
                    );
                }
            } catch (error) {
                console.error('FCM Setup Error:', error);
            }
        };

        setupFCM();

        // Handle foreground messages
        const unsubscribe = onMessage(messagingInstance, remoteMessage => {
            console.log('FCM Foreground Message:', remoteMessage);

            const title = remoteMessage.notification?.title || 'New Message';
            const body =
                remoteMessage.notification?.body ||
                'You have a new notification';

            Alert.alert(title, body);
        });

        return () => unsubscribe();
    }, []);


    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: renderTabBarIcon(route.name, colorMap.primary),
                headerShown: false,
                tabBarStyle: {
                    borderTopWidth: 0,
                    borderColor: colorMap.secondary,
                    backgroundColor: colorMap.bgColor,
                },
                headerShadowVisible: true,
                tabBarActiveTintColor: colorMap.secondary,
                tabBarInactiveTintColor: colorMap.primary,
            })}
        >
            <Tab.Screen
                name="HomeTab"
                component={HomeStack}
                options={{
                    title: 'Home',
                }}
            />
            <Tab.Screen
                name="ChurchLifeTab"
                component={ChurchLifeStack}
                options={{
                    title: 'Church Life',
                }}
            />
            <Tab.Screen
                name="ResourcesTab"
                component={ResourcesStack}
                options={{
                    title: 'Resources',
                }}
            />
            <Tab.Screen
                name="AudioPlayerTab"
                component={AudioStack}
                options={{
                    title: 'Audio Player',
                }}
            />
            <Tab.Screen
                name="Settings"
                component={SettingsView}
                options={{
                    title: 'Settings',
                }}
            />
        </Tab.Navigator>
    );
}

export default Main;
