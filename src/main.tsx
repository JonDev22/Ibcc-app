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
    subscribeToTopic,
} from '@react-native-firebase/messaging';
import { Alert, Platform } from 'react-native';
import { getApp } from '@react-native-firebase/app';
// import { IAnnouncement } from './interfaces/IAnnouncement';
// import { IEvent } from './interfaces/IEvent';
// import { subscribeToCollection } from './hooks/subscribeToCollection';
import resourcesStorage from './storage/resourcesStorage';

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
    const { setAnnouncements, setEvents } = resourcesStorage();

    useEffect(() => {
        const auth = getAuth();
        const authStateSetup = onAuthStateChanged(auth, user => {
            if (user?.email) {
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
            setUser(tempUser);
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
                    const authStatus = await requestPermission(
                        messagingInstance,
                    );
                    const enable =
                        authStatus === AuthorizationStatus.AUTHORIZED ||
                        authStatus === AuthorizationStatus.PROVISIONAL;

                    if (!enable) {
                        return;
                    }
                }

                const token = await getToken(messagingInstance);
                console.log('FCM Token:', token);

                await subscribeToTopic(messagingInstance, 'events');
                await subscribeToTopic(messagingInstance, 'announcements');
                console.log('Subscribed to topics: events, announcements');
            } catch (error) {
                console.error('FCM Setup Error:', error);
            }
        };

        setupFCM();

        // Handle foreground messages
        const unsubscribe = onMessage(messagingInstance, remoteMessage => {
            console.log('FCM Foreground Message:', remoteMessage);
            
            const title = remoteMessage.notification?.title || 'New Message';
            const body = remoteMessage.notification?.body || 'You have a new notification';
            
            Alert.alert(title, body);
        });

        return () => unsubscribe();
    }, []);

    useEffect(() => {
        // const subToAnnouncements = subscribeToCollection<IAnnouncement>(
        //     'announcements',
        //     doc => {
        //         const data = doc.data();
        //         return {
        //             id: doc.id,
        //             ...data,
        //         } as IAnnouncement;
        //     },
        //     items => {
        //         setAnnouncements(items);
        //     },
        // );

        // const subToEvents = subscribeToCollection<IEvent>(
        //     'events',
        //     doc => {
        //         const data = doc.data();
        //         return {
        //             id: doc.id,
        //             ...data,
        //         } as IEvent;
        //     },
        //     items => {
        //         setEvents(items);
        //     },
        // );

        return () => {
            // subToAnnouncements();
            // subToEvents();
        };
    }, [setAnnouncements, setEvents]);

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
