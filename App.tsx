/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { SafeAreaProvider } from 'react-native-safe-area-context';
import Main from './src/main';
import { NavigationContainer } from '@react-navigation/native';
import { enableScreens } from 'react-native-screens';
import { KeyboardAvoidingView, Platform } from 'react-native';

enableScreens();

function App() {
    return (
        <SafeAreaProvider>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
            >
                <NavigationContainer>
                    <Main />
                </NavigationContainer>
            </KeyboardAvoidingView>
        </SafeAreaProvider>
    );
}

export default App;
