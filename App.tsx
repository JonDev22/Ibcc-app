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

enableScreens();

function App() {
    return (
        <SafeAreaProvider>
            <NavigationContainer>
                <Main />
            </NavigationContainer>
        </SafeAreaProvider>
    );
}

export default App;
