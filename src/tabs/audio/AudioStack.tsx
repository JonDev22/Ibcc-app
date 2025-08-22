import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Audio from './Audio';
import getStackScreenOptions from '../../functions/getStackScreenOptions';

const Stack = createNativeStackNavigator();

function AudioStack() {
    return (
        <Stack.Navigator screenOptions={getStackScreenOptions()}>
            <Stack.Screen name="Audio Player" component={Audio} />
        </Stack.Navigator>
    );
}

export default AudioStack;
